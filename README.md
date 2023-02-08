# Invoice Generator
Created with "ASP.NET Core with React.js" project and using .NET 7 version.

## Features added
- Add service provider / client
- Add product / service
- Select provider / service
- Select products / services
- VAT rate calculations based by these requirements:
  - When the service provider is not a VAT payer - VAT is not calculated on the order amount.
  - When the service provider is a VAT payer and the customer:
    - Outside the EU (European Union) - VAT is applied at 0%
    - lives in the EU, is not a VAT payer, but lives in a different country than the service provider. Applicable
      VAT x%, where x is the VAT percentage applied in that country, for example: Lithuania 21% VAT
    - lives in the EU, is a VAT payer, but lives in a different country than the service provider. 0% applied
      under reverse charge.
    - when the customer and the service provider live in the same country - VAT is always applied
- All countries list(.txt) with standard VAT rates
- Print / Download Invoice

## Notes
Main focus was to get my hands on "ASP.NET Core with React.js" project and learn how the "things" working there(f.e. passing data back and forth, opening component in a new window tab and printing / downloading it and so on). So, i mean styling and input checking was in the second plan. Ofcourse there is mistakes and other "bad" stuff in this project but im really happy that i invested some time in it. Learning is fun!
P.S. Don't shy away from constructive criticism, I'm especially looking forward to advice on how and what could have been done better.

## Images

![home1](https://user-images.githubusercontent.com/94862107/217341080-09d7b14e-f01b-446b-9632-81f8f6c71830.PNG)
![home2](https://user-images.githubusercontent.com/94862107/217341091-d1d49c36-afb4-4f45-b505-8fce9e342628.PNG)
![home3](https://user-images.githubusercontent.com/94862107/217341102-94ea7391-fa73-4934-a3e1-f470a360949f.PNG)
![provider1](https://user-images.githubusercontent.com/94862107/217341125-7ee01170-3349-4e17-a6df-7831d345da0c.PNG)
![client1](https://user-images.githubusercontent.com/94862107/217341132-a3e1e947-ebb9-4b6b-8481-4551267c7b87.PNG)
![generate2](https://user-images.githubusercontent.com/94862107/217341153-7dff5e20-bf1a-4a74-b08e-5fd6fb2d79d5.PNG)
![generate1](https://user-images.githubusercontent.com/94862107/217341143-ac90660e-5067-4b11-8b07-670e95986b58.PNG)
![invoice1](https://user-images.githubusercontent.com/94862107/217341289-7a561a2d-c2a0-4d04-9f2e-faa3f0d333c9.PNG)
![invoice2](https://user-images.githubusercontent.com/94862107/217341309-483b3fd5-c24a-4579-adce-0173df0e2db7.PNG)
![invoice3](https://user-images.githubusercontent.com/94862107/217341318-d700a7fd-0e2e-44e9-8502-3dee09240ae6.PNG)
![invoice4](https://user-images.githubusercontent.com/94862107/217341331-e7d4098a-2a04-4f94-bd85-4ece319e0c93.PNG)
![invoice5](https://user-images.githubusercontent.com/94862107/217341889-ef70afbf-512d-4b61-89a9-204efe10bd2c.PNG)













