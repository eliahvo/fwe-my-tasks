import { labelBuilder } from "../builder/Label";
import { taskBuilder } from "../builder/Task";

describe("DashboardPage", () => {
  const task = taskBuilder({})();
  const label = labelBuilder({})();
  it("can create a new task", () => {
    cy.visit("/");

    const url = cy.url();
    console.log(url);

    cy.screenshot();
    cy.findByTestId(/add-task-button/i).click();
    cy.findByLabelText(/name/i).type(task.name);
    cy.findByLabelText(/description/i).type(task.description);

    cy.findByText("Add new task").click();
    cy.findByTestId("task-list").find("li").should("have.length", 1);
    cy.screenshot();
  });

  it("can filter tasks", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/filter-task-button/i).click();
    cy.findByLabelText(/task name/i).type(task.name);

    cy.findByText("Save filter").click();
    cy.findByTestId("task-list").find("li").should("have.length", 1);
  });

  it("can delete a new task", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("delete-task-button" + task.name).click();
    cy.findByTestId("task-list").find("li").should("have.length", 0);
    cy.screenshot();
  });

  it("can create a new label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/add-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);

    cy.findByTestId("addLabel").click();
    cy.findByTestId("all-label-list").find("li").should("have.length", 1);
    cy.screenshot();
  });

  it("can delete a new label", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId(/delete-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByTestId("deleteLabel").click();
    cy.findByTestId("all-label-list").find("li").should("have.length", 0);
    cy.screenshot();
  });
});
