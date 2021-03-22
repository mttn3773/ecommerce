export interface OnSuccessResponse {
  success: boolean;
  msg: string;
  data: any;
}

interface OnSuccessProps {
  msg: string;
  data: any;
}

export const onSuccessResponse = ({
  msg,
  data,
}: OnSuccessProps): OnSuccessResponse => {
  return { success: true, msg, data };
};
