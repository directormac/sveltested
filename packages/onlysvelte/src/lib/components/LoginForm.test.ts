import { cleanup, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
// importing the component itself
import LoginForm from "./LoginForm.svelte";

const user = userEvent.setup();

describe("LoginForm component test", async () => {
  afterEach(() => cleanup());

  // Rendering everything by getByTestId which looks for data-testid=""
  it("Should render form and children with initial conditions", () => {
    const { getByTestId } = render(LoginForm);

    // Check form if rendered
    expect(getByTestId("login-form")).toBeInTheDocument();

    // Check both inputs if rendered
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();

    // Check button if rendered && disabled
    expect(getByTestId("login-button")).toBeInTheDocument();
    expect(getByTestId("login-button")).toHaveTextContent("Login");
    expect(getByTestId("login-button")).toBeDisabled();
  });

  it("Should require password input even if email is valid", async () => {
    const { getByTestId } = render(LoginForm);
    // User input email
    await user.type(getByTestId("email-input"), "test@test.com");
    // User clicks Login button
    await user.click(getByTestId("login-button"));
    // Checks password-input invalid
    expect(getByTestId("password-input")).toBeInvalid();
  });

  it("Should enable button after valid input inputs", async () => {
    const { getByTestId } = render(LoginForm);

    // User inputs element at email-input
    await user.type(getByTestId("email-input"), "test@test.com");
    await user.type(getByTestId("password-input"), "testpassword");

    // Checks if input has value
    expect(getByTestId("email-input")).toHaveValue("test@test.com");
    expect(getByTestId("password-input")).toHaveValue("testpassword");

    // Login Button Should be enabled
    expect(getByTestId("login-button")).toBeEnabled();
  });

  it("Should submit form)", async () => {
    // Initiliaze component with props only works if props are declared as export
    const { getByTestId, component } = render(LoginForm, {
      email: "test@test.com",
      password: "testpassword",
    });
    let userLoginInput = {
      email: "",
      password: "",
    };
    const dispatch = vi.fn(
      (event) =>
        (userLoginInput = {
          email: event.detail.email,
          password: event.detail.password,
        })
    );
    component.$on("submit", dispatch);
    // Click Submit button
    await user.click(getByTestId("login-button"));
    expect(dispatch).toHaveBeenCalled();
  });
});
