import { render, screen } from "@testing-library/react"
import SingleContact from "../pages/SingleContact";

test('expect button exists', async () => {
  render(<SingleContact />)
  // eslint-disable-next-line testing-library/no-debugging-utils
  // screen.debug();
  expect(await screen.findAllByRole('button', {class: "contactSubmit"})).toBeDefined()
})


