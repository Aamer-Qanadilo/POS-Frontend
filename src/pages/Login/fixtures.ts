type response = {
  message?: string;
  token?: string;
};

type inputs = {
  email: string;
  password: string;
};

export const mockedUser: inputs = {
  email: "aamer_qanadilo@hotmail.com",
  password: "AaMeR1169@@",
};

export const mockedSuccessUser: response = {
  message: "success",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTg5NmU0NzRkMWNlMGU4NDFhOTJlMiIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTY4OTUxMjQ1MH0._lbAj2PxV06_HHNIbC2AsKCAdm_vXrvhylFXpvdlwaU",
};
