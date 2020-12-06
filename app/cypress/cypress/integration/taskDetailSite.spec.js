import { labelBuilder } from "../builder/Label";
import { taskBuilder } from "../builder/Task";
import { trackingBuilder } from "../builder/Tracking";

describe("Task detail page", () => {
  const task = taskBuilder({})();
  const label = labelBuilder({})();
  const tracking = trackingBuilder({})();
  it("can create a new task, label and route to detail page by clicking on it", () => {
    cy.visit("/");
    cy.screenshot();

    cy.findByTestId(/add-task-button/i).click();
    cy.findByLabelText(/name/i).type(task.name);
    cy.findByLabelText(/description/i).type(task.description);
    cy.findByText("Add new task").click();
    cy.findByTestId("task-list").find("li").should("have.length", 1);

    cy.findByTestId(/add-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByTestId("addLabel").click();
    cy.findByTestId("all-label-list").find("li").should("have.length", 1);

    cy.findByTestId("task-onClick" + task.name).click();
    cy.url().should('contain', '/tasks/');
    cy.screenshot();
  });

  it("can add label to task", () => {
    cy.screenshot();
    
    cy.findByTestId(/add-label-toTask-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByTestId("addLabelToTask").click();
    cy.findByTestId("all-labelsFromTask-list").find("li").should("have.length", 1);

    cy.screenshot();
  });

  it("can delete label to task", () => {
    cy.screenshot();
    
    cy.findByTestId(/delete-label-fromTask-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByTestId("deleteLabelToTask").click();
    cy.findByTestId("all-labelsFromTask-list").find("li").should("have.length", 0);

    cy.screenshot();
  });

  it("can add a new tracking to task", () => {
    cy.screenshot();
    
    cy.findByTestId(/add-tracking-toTask-button/i).click();
    cy.findByLabelText(/description/i).type(tracking.description);
    cy.findByTestId("addTrackingToTask").click();
    cy.findByTestId("tracking-list").find("li").should("have.length", 1);

    cy.screenshot();
  });

  it("can delete a tracking from task", () => {
    cy.screenshot();
    
    cy.findByTestId(/delete-tracking-button/i).click();
    cy.findByTestId("tracking-list").find("li").should("have.length", 0);

    cy.screenshot();
  });

  it("can delete task, label in dashboard", () => {
    cy.visit("/");
    cy.screenshot();
    cy.findByTestId("delete-task-button" + task.name).click();
    cy.findByTestId("task-list").find("li").should("have.length", 0);

    cy.findByTestId(/delete-label-button/i).click();
    cy.findByLabelText(/name/i).type(label.name);
    cy.findByTestId("deleteLabel").click();
    cy.findByTestId("all-label-list").find("li").should("have.length", 0);
    cy.screenshot();
  });
});
