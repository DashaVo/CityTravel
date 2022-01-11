using CityTraveler.Domain.Entities;
using CityTraveler.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CityTraveler.Infrastucture.Data
{
    public static class InitialData
    {
        public static void SetupEmailTemplates(ApplicationContext context)
        {
            if (!context.EmailTemplatesModels.Any())
            {
                var templates = new List<EmailTemplateModel>()
                {
                    new EmailTemplateModel { Subject = "Confirm profile", Type = EmailType.ConfirmProfile, Body = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/> <title></title> </head> <body> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='center'> <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' > <tr> <td align='center' valign='top' height='303' background='https://i.ibb.co/BGFsz60/main-email.jpg' style=' width: 100%; height: 303px; background-image: url(https://i.ibb.co/BGFsz60/main-email.jpg); background-position: center top; background-repeat: no-repeat; background-size: 100% 100%; ' ><!--[if gte mso 9]> <v:image xmlns:v='urn:schemas-microsoft-com:vml' id='theImage' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:0; left:0; border:0; z-index:1;' src='https://i.ibb.co/BGFsz60/main-email.jpg'/> <v:shape xmlns:v='urn:schemas-microsoft-com:vml' id='theText' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:-5; left:-10; border:0; z-index:2;'><![endif]--> <table> <tr> <td align='left' width='210'> <h5 style=' font-size: 18px; margin: 0; margin-left: 20px; margin-top: 20px; color: white; font-family: Montserrat, Arial, sans-serif; ' > TASTESELECTOR </h5> <p style=' font-size: 12px; margin-left: 20px; margin-top: 0; color: #f7f3f2; font-family: Roboto, Arial, sans-serif; ' > Livet er for kort til dårlig vin </p></td><td width='210'></td><td width='210'></td></tr><tr> <td colspan='3' align='center'> <h1 style=' font-size: 35px; margin-top: 80px; color: white; font-family: Montserrat, Arial, sans-serif; ' > INFO </h1> </td></tr></table><!--[if gte mso 9]> </v:shape><![endif]--> </td></tr><tr> <td style=' font-size: 12px; margin-left: 15px; margin-top: 0; color: black; font-weight: normal; line-height: 1.4; font-family: Montserrat, Arial, sans-serif; ' > <h3 style=' padding: 20px; padding-top: 30px; font-size: 16px; margin: 0; font-weight: bold; margin-top: 20px; color: black; font-family: Montserrat, Arial, sans-serif; ' > Bekræft profil </h3> <p> Din profil blev oprettet. Det sidste trin er at bekræfte din e-mail for at sende meddelelser fra vores ansøgning. </p> <p style='text-align: center;'><a title='Click to continue' href='https://{Request.Host.Value}/api/account/confirm-profile?email={Email}&token={ConfirmToken}'>Bekræft</a></p> </td></tr></table> </td></tr></table> </body></html>" },
                    new EmailTemplateModel { Subject = "New password", Type = EmailType.ForgotPassword, Body = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/> <title></title> </head> <body> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='center'> <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' > <tr> <td align='center' valign='top' height='303' background='https://i.ibb.co/BGFsz60/main-email.jpg' style=' width: 100%; height: 303px; background-image: url(https://i.ibb.co/BGFsz60/main-email.jpg); background-position: center top; background-repeat: no-repeat; background-size: 100% 100%; ' ><!--[if gte mso 9]> <v:image xmlns:v='urn:schemas-microsoft-com:vml' id='theImage' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:0; left:0; border:0; z-index:1;' src='https://i.ibb.co/BGFsz60/main-email.jpg'/> <v:shape xmlns:v='urn:schemas-microsoft-com:vml' id='theText' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:-5; left:-10; border:0; z-index:2;'><![endif]--> <table> <tr> <td align='left' width='210'> <h5 style=' font-size: 18px; margin: 0; margin-left: 20px; margin-top: 20px; color: white; font-family: Montserrat, Arial, sans-serif; ' > TASTESELECTOR </h5> <p style=' font-size: 12px; margin-left: 20px; margin-top: 0; color: #f7f3f2; font-family: Roboto, Arial, sans-serif; ' > Livet er for kort til dårlig vin </p></td><td width='210'></td><td width='210'></td></tr><tr> <td colspan='3' align='center'> <h1 style=' font-size: 35px; margin-top: 80px; color: white; font-family: Montserrat, Arial, sans-serif; ' > INFO </h1> </td></tr></table><!--[if gte mso 9]> </v:shape><![endif]--> </td></tr><tr> <td style=' font-size: 12px; margin-left: 15px; margin-top: 0; color: black; font-weight: normal; line-height: 1.4; font-family: Montserrat, Arial, sans-serif; ' > <h3 style=' padding: 20px; padding-top: 30px; font-size: 16px; margin: 0; font-weight: bold; margin-top: 20px; color: black; font-family: Montserrat, Arial, sans-serif; ' > Nye kodeord </h3> <p> Din adgangskode blev nulstillet af admin. For at oprette en ny adgangskode skal du videresende dette link: </p><p style='text-align: center;'> <a title='Click to continue' href='https://{Request.Host.Value}/resetpwd?token={Token}'>Opdater</a> </p></td></tr></table> </td></tr></table> </body></html>" },
                    new EmailTemplateModel { Subject = "Password Restore", Type = EmailType.PasswordRestore, Body = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'> <head> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/> <title></title> </head> <body> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='center'> <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' > <tr> <td align='center' valign='top' height='303' background='https://i.ibb.co/BGFsz60/main-email.jpg' style=' width: 100%; height: 303px; background-image: url(https://i.ibb.co/BGFsz60/main-email.jpg); background-position: center top; background-repeat: no-repeat; background-size: 100% 100%; ' ><!--[if gte mso 9]> <v:image xmlns:v='urn:schemas-microsoft-com:vml' id='theImage' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:0; left:0; border:0; z-index:1;' src='https://i.ibb.co/BGFsz60/main-email.jpg'/> <v:shape xmlns:v='urn:schemas-microsoft-com:vml' id='theText' style='behavior: url(#default#VML); display:inline-block; position:absolute; height:303px; width:600px; top:-5; left:-10; border:0; z-index:2;'><![endif]--> <table> <tr> <td align='left' width='210'> <h5 style=' font-size: 18px; margin: 0; margin-left: 20px; margin-top: 20px; color: white; font-family: Montserrat, Arial, sans-serif; ' > TASTESELECTOR </h5> <p style=' font-size: 12px; margin-left: 20px; margin-top: 0; color: #f7f3f2; font-family: Roboto, Arial, sans-serif; ' > Livet er for kort til dårlig vin </p></td><td width='210'></td><td width='210'></td></tr><tr> <td colspan='3' align='center'> <h1 style=' font-size: 35px; margin-top: 80px; color: white; font-family: Montserrat, Arial, sans-serif; ' > INFO </h1> </td></tr></table><!--[if gte mso 9]> </v:shape><![endif]--> </td></tr><tr> <td style=' font-size: 12px; margin-left: 15px; margin-top: 0; color: black; font-weight: normal; line-height: 1.4; font-family: Montserrat, Arial, sans-serif; ' > <h3 style=' padding: 20px; padding-top: 30px; font-size: 16px; margin: 0; font-weight: bold; margin-top: 20px; color: black; font-family: Montserrat, Arial, sans-serif; ' > Opdater kodeord </h3> <p> Hej, {Name} </p> <p> Adgangskode til brugerprofil {Email} er nulstillet til: {Password} </p> </td></tr></table> </td></tr></table> </body></html>" },
                };

                context.EmailTemplatesModels.AddRange(templates);

                context.SaveChanges();
            }
        }

        public static void SetupData(ApplicationContext context)
        {
            /*var trips = new List<TripModel>();
            for (int i = 0; i < 10; i++)
            {
                var trip = new TripModel()
                {
                    TripStart = DateTime.Now,
                    TripEnd = DateTime.Now.AddHours(4),
                    Entertaiments = new List<EntertaimentModel>(),
                    Price = new TripPriceModel(),
                    Title = $"TripTitle{i}",
                    Description = $"TripDescription{i}",
                    OptimalSpent = TimeSpan.Zero,
                    RealSpent = TimeSpan.Zero,
                    TripStatus = TripStatus.New,
                    TagString = $"tripTagString{i}",
                    TemplateId = Guid.NewGuid()
                };
                if (i % 2 == 0)
                {
                    trip.DafaultTrip = true;
                }
                if (i > 5)
                {
                    trip.AverageRating = 4;
                }
                trips.Add(trip);
            }
            context.Trips.AddRange(trips);
            context.SaveChanges();

             //StreetGen
             var streets = new List<StreetModel>();
             for (int i = 0; i < 5; i++)
             {
                 var street = new StreetModel()
                 {
                     Title = $"Street-{i}",
                     Description = $"Street description-{i}"
                 };
                 streets.Add(street);
             }

             //EntertainmentGen
             var entertainments = new List<EntertaimentModel>();
             for (int i = 0; i < 10; i++)
             {
                 var rnd = new Random();
                 var streetIndex = rnd.Next(0, 4);

                 var entertainmentType = EntertainmentType.Landscape;
                 switch (i % 3)
                 {
                     case 0:
                         entertainmentType = EntertainmentType.Event;
                         break;
                     case 1:
                         entertainmentType = EntertainmentType.Institution;
                         break;
                 }
                 var entertainment = new EntertaimentModel()
                 {
                     Title = $"Entertainment - {i}",
                     Address = new AddressModel()
                     {
                         Coordinates = new CoordinatesAddressModel()
                         {
                             Latitude = rnd.Next(1, 2000),
                             Longitude = rnd.Next(1, 2000),
                         },
                         HouseNumber = $"{i}",
                         ApartmentNumber = $"{i}",
                         Street = streets[streetIndex],
                     },
                     AveragePrice = new EntertaimentPriceModel(),
                     Reviews = new List<EntertainmentReviewModel>(),
             Type = entertainmentType,
         };
         entertainments.Add(entertainment);
     }

     context.Streets.AddRange(streets);
     context.SaveChanges();
     context.Entertaiments.AddRange(entertainments);
     context.SaveChanges();
     
           
        }*/
        }
    }
}
