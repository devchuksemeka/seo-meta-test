import { Alert, Box, Drawer, IconButton, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useClipboard } from "use-clipboard-copy";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import styles from "./style.module.scss";
import Icon from "@/components/atoms/Icon";

import { Business } from "@/constants/business";
import Typography from "@/components/atoms/Typography";
import useShow from "@/hooks/useShow";

interface BusinessShareMenuDrawerProps {
  isOpen: boolean;
  onClose: VoidFunction;
  business: Business;
}

const BusinessShareMenuDrawer = (props: BusinessShareMenuDrawerProps) => {
  const { isOpen, onClose, business } = props;

  const router = useRouter();
  const { isShowing, show, hide } = useShow();

  const url = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/businesses/${business.id}`;

  const clipboard = useClipboard({
    onSuccess() {
      console.log("Text was copied successfully!");
      show();
    },
    onError() {
      console.log("Failed to copy text!");
    },
  });

  const shareButtonStyles = {
    borderRadius: "50%",
  };

  const platforms = [
    {
      name: "WhatsApp",
      key: "whatsapp",
      button: (
        <WhatsappShareButton url={url} style={shareButtonStyles}>
          <IconButton
            style={{
              backgroundColor: "#50cb5d",
            }}
          >
            <Icon name='social-whatsapp' color='text' />
          </IconButton>
        </WhatsappShareButton>
      ),
      onClick: () => {},
    },
    {
      name: "Facebook",
      key: "facebook",
      button: (
        <FacebookShareButton
          url={url}
          quote={business.description}
          hashtag='#carojonsearch'
          style={shareButtonStyles}
        >
          <IconButton
            style={{
              backgroundColor: "rgb(11 132 237)",
            }}
          >
            <Icon name='social-facebook' color='text' />
          </IconButton>
        </FacebookShareButton>
      ),
    },
    {
      name: "X (Twitter)",
      key: "twitter",
      button: (
        <TwitterShareButton
          url={url}
          style={shareButtonStyles}
          title={business.description}
          via='carojon.com'
          hashtags={["carojon", "carojonsearch", "business", "services"]}
        >
          <IconButton
            style={{
              backgroundColor: "black",
            }}
          >
            <Icon name='social-x' color='text' />
          </IconButton>
        </TwitterShareButton>
      ),
    },
    {
      name: "Linkedin",
      key: "linkedin",
      button: (
        <LinkedinShareButton
          url={url}
          style={shareButtonStyles}
          // title='Page title'
          summary={business.description}
          source='carojon.com'
        >
          <IconButton
            style={{
              backgroundColor: "#1a69c6",
            }}
          >
            <Icon name='social-linkedin' color='text' />
          </IconButton>
        </LinkedinShareButton>
      ),
    },
    {
      name: "Copy Link",
      key: "copy_link",
      button: (
        <IconButton onClick={() => clipboard.copy(url)}>
          <Icon name='copy-link' />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Drawer anchor='bottom' open={isOpen} onClose={onClose}>
        <Box className={styles.business_share_drawer}>
          <Typography fontStyle='extra-bold'>Share</Typography>
          <Box
            display='flex'
            flexWrap='wrap'
            alignItems='center'
            gap='2rem'
            py='1rem'
            px='.5rem'
          >
            {platforms.map(({ key, name, button }) => {
              return (
                <Box
                  key={key}
                  display='flex'
                  flexDirection='column'
                  gap='.5rem'
                  alignItems='center'
                >
                  {button}
                  <Typography variant='small'>{name}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>
      <Snackbar
        open={isShowing}
        autoHideDuration={3000}
        onClose={hide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity='info'>Copied link to clipboard</Alert>
      </Snackbar>
    </>
  );
};
export default BusinessShareMenuDrawer;
