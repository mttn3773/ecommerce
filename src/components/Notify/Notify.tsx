import { useToast } from "@chakra-ui/toast";
import React, { useContext, useEffect } from "react";
import { ACTIONS } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

interface NotifyProps {}

export const Notify: React.FC<NotifyProps> = ({}) => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const { errors, success } = notify;
  const toast = useToast();
  useEffect(() => {
    if (!errors || !errors.length) return;
    toast({
      title: "An error occurred.",
      description: errors[0].msg,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    dispatch({
      type: ACTIONS.NOTIFY,
      payload: { ...notify, errors: [] },
    });
  }, [errors]);
  useEffect(() => {
    if (!success || !success.length) return;
    toast({
      title: "Success!",
      description: success[0].msg,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    dispatch({
      type: ACTIONS.NOTIFY,
      payload: { ...notify, success: [] },
    });
  }, [success]);
  return <></>;
};
