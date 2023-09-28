import { useRouter } from "next/router";

import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import TextField from "@/components/molecules/TextField";

import styles from "./style.module.scss";
import Icon from "@/components/atoms/Icon";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { required } from "@/utils/validations";
import SelectField from "@/components/molecules/SelectField";
import { LocationArea, Service } from "@/contexts/AppApiInitialization";

interface BusinessFilterProps {
  selectedServiceType: Service;
  selectedLocation: LocationArea;
  locationAreas: LocationArea[];
  services: Service[];
  loading: boolean;
  onSearch: ({
    serviceType,
    location,
  }: {
    serviceType: string;
    location: string;
  }) => void;
}
export default function BusinessFilter({
  selectedLocation,
  selectedServiceType,
  locationAreas,
  services,
  onSearch,
  loading,
}: BusinessFilterProps) {
  const [showFilterLocation, setShowFilterLocation] = useState<boolean>(false);

  const handleOnEditFilterLocation = () => {
    setShowFilterLocation(true);
  };

  const cancelEditFilterLocation = () => {
    setShowFilterLocation(false);
  };

  const initialValues = {
    serviceType: {
      value: selectedServiceType?.slug!,
      label: selectedServiceType?.name!,
    },
    location: {
      value: selectedLocation?.slug!,
      label: selectedLocation?.name!,
    },
  };

  return (
    <section className={styles.filter_section}>
      <section className={styles.filter_section_location_hint}>
        <section className={styles.filter_section_location_hint_left}>
          <Typography variant='large' fontStyle='extra-bold' color='secondary'>
            Filter location:
          </Typography>
          <Typography variant='large' fontStyle='extra-bold'>
            {selectedLocation?.name}
          </Typography>
          {!showFilterLocation && (
            <Button
              variant='text'
              size='smallest'
              onClick={handleOnEditFilterLocation}
            >
              <Icon name='edit' />
            </Button>
          )}
        </section>

        {showFilterLocation && (
          <Button
            variant='outlined'
            size='smallest'
            color='error'
            onClick={cancelEditFilterLocation}
          >
            Cancel
          </Button>
        )}
      </section>
      <section className={styles.filter_section_form}>
        <Form
          onSubmit={onSearch}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={styles.search_form}>
              {showFilterLocation && (
                <div
                  style={{
                    flex: "2 1 70%",
                  }}
                >
                  <Field name='location' validate={required}>
                    {(fieldProps) => (
                      <SelectField
                        placeholder='Specify location'
                        isClearable
                        isSearchable
                        options={locationAreas.map((service) => {
                          return {
                            value: service.slug,
                            label: service.name,
                          };
                        })}
                        {...fieldProps}
                      />
                    )}
                  </Field>
                </div>
              )}
              <div
                style={{
                  flex: "2 1 60%",
                }}
              >
                <Field name='serviceType' validate={required}>
                  {(fieldProps) => (
                    <SelectField
                      placeholder='Search for Service'
                      isClearable
                      isSearchable
                      options={services.map((service) => {
                        return {
                          value: service.slug,
                          label: service.name,
                        };
                      })}
                      {...fieldProps}
                    />
                  )}
                </Field>
              </div>
              <div
                style={{
                  flex: "1 1 30%",
                }}
              >
                <Button
                  fullWidth
                  type='submit'
                  variant='contained'
                  size='medium'
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
            </form>
          )}
        />
      </section>
    </section>
  );
}
