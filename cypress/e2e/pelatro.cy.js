describe("template spec", () => {
  it("passes", () => {

    cy.visit("https://rs-cmp-rta-501.dtacnetwork.co.th/LinkWorkbench/");
    cy.get("#inputUsername").type("chinnawat");
    cy.get("#inputPassword").type("Tao2023!@");
    cy.get("form").submit();

    const FLASH_DEAL_EXPIRE =
      "https://rs-cmp-rta-501.dtacnetwork.co.th/NodeFrontend/stat-param-definitions/509006";
    cy.visit(FLASH_DEAL_EXPIRE);

    const values = "IPK_DS_OC_DYNAMIC20M_18D;2024-09-13 00:00:00|TOPABS60;2024-09-08 00:00:00|";

    const listValues = values.split("\|");

    listValues.forEach( (data) => {
      
      if (data != '') {
        cy.get(".CodeMirror").parent().should('contain',data)
      }

    });
  });
});
