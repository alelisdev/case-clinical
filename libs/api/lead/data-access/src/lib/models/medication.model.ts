export const NonFormularyNdcList = [
    82607066026,
    89130444401,
    78206012601,
    78206014301,
    78206017201
];

export class Medication {
    public Ndc: number;
    public LabelName: string;
    public Quantity: number;
    public DaysSupply: number;
    public IsFormulary: boolean;
  
    constructor(ndc: number, labelName: string, quantity: number, daysSupply: number) {
      this.Ndc = ndc;
      this.LabelName = labelName;
      this.Quantity = quantity;
      this.DaysSupply = daysSupply;
      this.IsFormulary = false; // Default value is false
    }
  
    static LoadFromString(singleLineFromFileContents: string, nonFormularyNdcList: number[]): Medication {
      const [ndc, labelName, quantity, daysSupply] = singleLineFromFileContents.split('\t');
      const medication = new Medication(
        parseInt(ndc),
        labelName.trim(),
        parseInt(quantity),
        parseInt(daysSupply)
      );
  
      medication.IsFormulary = !nonFormularyNdcList.includes(medication.Ndc);
  
      return medication;
    }
  
    static LoadFileContents(fileContent: string, nonFormularyNdcList: number[]): Medication[] {
      return fileContent
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => Medication.LoadFromString(line, nonFormularyNdcList));
    }
  }
  
  export const SampleMedicationFile = 
  `NDC LABEL_NAME  Quantity    Days Supply
69097015907         MELOXICAM TABS 15 MG    30  30
68382005105         MELOXICAM TABS 15 MG    30  30
00591352530         LIDOCAINE PTCH 5 %  30  30
00406012505         HYDROCODONE-ACETAMINOPHEN TABS 10-325 MG    120 30
00406012501         HYDROCODONE-ACETAMINOPHEN TABS 10-325 MG    120 30
52817033200         CYCLOBENZAPRINE HCL TABS 10 MG  90  30
00603459315         METHYLPREDNISOLONE TBPK 4 MG    21  6
59651036205         IBUPROFEN TABS 800 MG   90  30
59011042010         OXYCONTIN T12A 20 MG    60  30
59011041010         OXYCONTIN T12A 10 MG    60  30
82607066026         FLOWFLEX COVID-19 AG HOME TEST KIT      8   8
89130444401         SUPARTZ FX SOSY 25 MG/2.5ML 25  35
78206012601         DULERA AERO 200-5 MCG/ACT   13  30
78206014301         MAXALT-MLT TBDP 10 MG   9   30
78206017201         SINGULAIR TABS 10 MG    30  30
`