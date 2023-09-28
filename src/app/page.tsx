"use client";

import { useRouter } from "next/navigation";
import { Form, Field } from "react-final-form";

import Button from "@/components/atoms/Button";
import TextField from "@/components/molecules/TextField";

import styles from "./home.module.scss";
import { required } from "@/utils/validations";
import SelectField from "@/components/molecules/SelectField";
import { useAppApiInitializationContext } from "@/contexts/AppApiInitialization";
import { gaEvent } from "@/utils/google-analytics";

interface FormSubmitProps {
  serviceType: { value: string; label: string };
  location: { value: string; label: string };
}

export default function Home() {
  const router = useRouter();
  const { locationAreas, services } = useAppApiInitializationContext();

  const onSubmit = ({ serviceType, location }: FormSubmitProps) => {
    gaEvent({
      category: "Business Search",
      action: "search_for_business",
    });
    router.push(
      `/businesses?serviceType=${serviceType.value}&location=${location.value}`
    );
  };

  return (
    <section className={styles.main_content}>
      <section className={styles.form_section}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className={styles.search_form}>
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
              <div className={styles.button_group}>
                <Button type='submit' variant='contained' size='large'>
                  SEARCH
                </Button>
              </div>
            </form>
          )}
        />
      </section>
    </section>
  );
}
