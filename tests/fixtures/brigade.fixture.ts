import { CreateBrigadeFileDto } from "@libs/contracts/bridage/create-bridage.dto";
import { testRequirementsBrigade } from "./requirements-brigade.fixture";

export const testBrigade = {
  _id: "6820d50e21d023b67bc72112",
  name: "Десантно-штурмова бригада ЗСУ",
  description: "Десантно-штурмові війська ЗСУ — елітні підрозділи, здатні швидко десантуватися в тил ворога, проводити рейди, утримувати стратегічні точки до підходу основних сил. Від бійців вимагається максимальна фізична підготовка, швидкість реакції, сила й витривалість. Вправи зосереджені на динаміці, витривалості та роботі з власною вагою.",
  image: "https://faralaer.s3.eu-west-2.amazonaws.com/821583105504",
  shortName: "ДШБ",
  requirementsBrigade: [
    testRequirementsBrigade
  ]
}



export const testCreateBrigadeDto: CreateBrigadeFileDto = {
  name: 'Alpha Squad',
  shortName: 'Alpha',
  description: 'Elite tactical brigade',
  requirementsBrigade: [
    {
      exercise: 'Push-ups',
      minimum: 20,
      maximum: 50,
    },
    {
      exercise: 'Running',
      minimum: 1000,
      maximum: 3000,
    },
  ],
  file: {
    fieldname: 'file',
    originalname: 'brigade-doc.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    size: 123456,
    buffer: Buffer.from('filecontent'),
    destination: './uploads',
    filename: '1234567890.pdf',
    path: './uploads/1234567890.pdf',
    stream: null as any,
  },
};
