import Login from "./";
import { screen, waitFor } from "@testing-library/react";
import UnAuthRender from "../../__tests__/unAuth_render";

import userEvent from "@testing-library/user-event";
import { mockedSuccessUser, mockedUser } from "./fixtures";
import httpCommon from "../../http-common";
import preview from "jest-preview";

const getters = {
  getEmailInput: () => screen.getByLabelText(/^Email Address/),
  getPasswordInput: () => screen.getByLabelText(/^Password/),
  getSignInButton: () =>
    screen.getByRole("button", {
      name: /Sign In/,
    }),
};

export const loginUser = () => {
  const signInButton = getters.getSignInButton();
  const emailInput = getters.getEmailInput();
  const passwordInput = getters.getPasswordInput();

  userEvent.type(emailInput, mockedUser.email);
  userEvent.type(passwordInput, mockedUser.password);
  userEvent.click(signInButton);
};

describe("components/SignUp", () => {
  /**
   * @group smoke
   */
  describe("Smoke Tests", () => {
    it("Should render SignUp Component correctly", () => {
      UnAuthRender(<Login />);

      const signInButton = getters.getSignInButton();
      const emailInput = getters.getEmailInput();
      const passwordInput = getters.getPasswordInput();

      expect(signInButton).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  describe("Validations", () => {
    beforeEach(() => {
      return UnAuthRender(<Login />);
    });

    it("Should has the sign in button disabled by default", () => {
      const signInButton = getters.getSignInButton();
      expect(signInButton).toBeDisabled();
    });

    it("Should show 'Required, please enter a valid Email' when the user clears the input or leave the field empty", async () => {
      const emailInput = getters.getEmailInput();

      userEvent.type(emailInput, "test");
      userEvent.clear(emailInput);
      userEvent.click(document.body);

      const validationMessage = await screen.findByText(
        "Required, please enter a valid Email",
      );

      expect(validationMessage).toBeInTheDocument();
    });

    it("Should show `Invalid Email address` when falsy email is entered", async () => {
      const emailInput = getters.getEmailInput();
      userEvent.type(emailInput, "test@");
      userEvent.click(document.body);

      const validationMessage = await screen.findByText(
        "Invalid Email address",
      );

      expect(validationMessage).toBeInTheDocument();
    });
  });

  describe("Basic Functionality", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should call SingIn API upon submitting", async () => {
      UnAuthRender(<Login />);
      const signInAPI = jest
        .spyOn(httpCommon, "post")
        .mockImplementation((url) => Promise.resolve(mockedSuccessUser));

      await loginUser();
      await waitFor(() => {
        expect(signInAPI).toBeCalled();
      });
      preview.debug();
    });
  });
});
