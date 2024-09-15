// const carInfo = {
//   carSerialNo:"AUDIXX"

// }

const customerInfos =
  "/Users/memorytao/development/automate/cypress/e2e/App Sheet - Sheet1.csv";

describe("template spec", () => {
  it("passes", () => {
    const mainPage =
      "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/compulsory";
    const carPage =
      "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/compulsory/car-1.10";
    const truck = "";
    const van = "";

    cy.readFile(customerInfos).then((infos) => {
      const data = infos.split("\n");

      const info = JSON.stringify(data).split(",");

      const customerInfo = {
        brand: info[7],
        model: info[8],
        registerYear: info[9],
        chassis: info[10],
        carColor: info[11],
        capacityCC: info[12],
        colorLicensePlate: info[13],
        carRegisterNo: info[14],
        carProvince: info[31],
        dateCoverage: info[16],
        monthCoverage: info[17],
        yearCoverage: Number(info[18]) + 543,
        receiveChannal: info[19],
        prefixName: info[21],
        firstName: info[22],
        lastName: info[23],
        birthDate: info[24],
        birthMonth: info[25],
        birthYear: info[26],
        idCardNo: info[27],
        addressByIdCard: info[28],
        subdistrict: info[29],
        district: info[30],
        province: info[31],
        postcode: info[32],
        email: info[33],
        mobileNo: info[34],
      };

      cy.log("Cunstomer Info: ", JSON.stringify(customerInfo));
      cy.visit(mainPage);

      cy.visit(
        "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/compulsory/car-1.10"
      );

      cy.visit(
        "https://insurverse-uat-environment-insure.insurverse.co.th/shopping/compulsory/car-1.10/insurance"
      ).wait(1500);

      cy.get("#onetrust-accept-btn-handler").click();

      carRegister(customerInfo);
      ownerRegister(customerInfo);
      // cy.contains("ดำเนินการต่อ").click();
    });
  });
});

function carRegister(customerInfo) {
  cy.contains("ข้อมูลรถที่เอาประกัน").click();

  cy.contains("กรุณาเลือกยี่ห้อ").click();
  cy.contains(customerInfo.brand.trim()).click();

  cy.contains("กรุณาเลือกรุ่น").click();
  cy.contains(customerInfo.model).click();

  cy.contains("กรุณาเลือกปีจดทะเบียน").click();
  cy.contains(customerInfo.registerYear).click();

  // chassis
  cy.get(".MuiInputBase-root").find("#\\:r8\\:").type(customerInfo.chassis);

  cy.contains("กรุณาเลือกสีรถ").click();
  cy.contains(customerInfo.carColor).click();
  // cy.contains(customerInfo.carColor).should('match',/^`${customerInfo.carColor}`$/).click();

  // cc เครื่อง
  cy.get(".MuiInputBase-root").find("#\\:rd\\:").type(customerInfo.capacityCC);

  // เลขทะเบียนรถ
  cy.get(".MuiInputBase-root")
    .find("#\\:rg\\:")
    .type(customerInfo.carRegisterNo);

  cy.contains("กรุณาเลือกจังหวัด").click();
  cy.contains(customerInfo.carProvince).click();

  cy.contains("วว").click();
  cy.contains(customerInfo.dateCoverage).click();

  cy.contains("ดด").click();
  cy.contains(customerInfo.monthCoverage).click();

  cy.contains("ปปปป").click();
  cy.contains(customerInfo.yearCoverage).click();

  if (customerInfo.receiveChannal == "ไปรษณีย์") {
    cy.contains("ไปรษณีย์").click();
  } else {
    cy.contains("E-Policy").click();
  }

  cy.contains("บันทึก").click();
}

function ownerRegister(customerInfo) {
  cy.contains("ข้อมูลเจ้าของกรมธรรม์").click();

  cy.contains("กรุณาระบุคำนำหน้าชื่อ").click();
  cy.contains(customerInfo.prefixName).click();

  cy.get(".MuiInputBase-root").find("#\\:rt\\:").type(customerInfo.firstName);
  cy.get(".MuiInputBase-root").find("#\\:r10\\:").type(customerInfo.lastName);

  cy.contains("วว").click();
  cy.contains(customerInfo.birthDate).click();

  cy.contains("ดด").click();
  cy.contains(customerInfo.birthMonth).click();

  cy.contains("ปปปป").click();
  cy.contains(customerInfo.birthYear).click();

  cy.get(".MuiInputBase-root").find("#\\:r19\\:").type(customerInfo.idCardNo);

  cy.get(".MuiInputBase-root")
    .find("#\\:r1c\\:")
    .type(customerInfo.addressByIdCard);

  cy.log(
    "Address: ",
    `${customerInfo.subdistrict} » ${customerInfo.district} » ${customerInfo.province} » ${customerInfo.postcode}`
  );

  // ตำบล
  cy.get(".MuiInputBase-root")
    .find('input[placeholder="กรุณาระบุแขวง/ตำบล"]')
    .type(customerInfo.subdistrict)

    cy.contains(customerInfo.subdistrict).click()
    // .click({ force: true });

  cy.get(".MuiInputBase-root")
    .find('input[name="email"]')
    .type(customerInfo.email);

  cy.get(".MuiInputBase-root")
    .find('input[name="confirmEmail"]')
    .type(customerInfo.email);

  cy.get(".MuiInputBase-root")
    .find('input[placeholder="กรุณากรอกเบอร์เพื่อใช้ยืนยันตัวตน"]')
    .type("0" + customerInfo.mobileNo);

  cy.contains("บันทึก").click().wait(900);
}
