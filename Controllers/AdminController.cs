using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Cargo.Models;

namespace Cargo.Controllers
{
    public class AdminController : Controller
    {
        CargoEntities aDBManager = new CargoEntities();
        // GET: Admin
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }

        #region ClientMaster
        public ActionResult ClientMaster()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetClientData()
        {
            try
            {
                var aClientList = aDBManager.Clients.ToList();

                return Json(new { aClientList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult GetClientDetails(int zClientID)
        {
            try
            {
                var aItemList = aDBManager.Clients.Single(i => i.ID == zClientID);


                return Json(new { aItemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateClientDetails(Client aobjP)
        {
            int iClientID = 0;
            try
            {
                if (aobjP.ID != 0)
                {
                    string password = Common.EncryptString(aobjP.Password);
                    iClientID = aobjP.ID;
                    var aitemList = aDBManager.Clients.Single(item => item.ID == aobjP.ID);

                    aitemList.Name = aobjP.Name;
                    aitemList.EmailID = aobjP.EmailID;
                    aitemList.Address = aobjP.Address;
                    aitemList.District = aobjP.District;
                    aitemList.State = aobjP.State;
                    aitemList.Pincode = aobjP.Pincode;
                    aitemList.PrimaryMobileNo = aobjP.PrimaryMobileNo;
                    aitemList.SecondaryMobileNo = aobjP.SecondaryMobileNo;
                    aitemList.SecondaryEmailID = aobjP.SecondaryEmailID;
                    aitemList.UserName = aobjP.UserName;
                    aitemList.Password = aobjP.Password;
                    aitemList.GST = aobjP.GST;

                    aDBManager.SaveChanges();

                    var aUserMst = aDBManager.UserMasters.SingleOrDefault(u => u.ClientID == aobjP.ID);
                    if (aUserMst != null)
                    {
                        aUserMst.EmailID = aobjP.EmailID;
                        aUserMst.Password = password;
                        aUserMst.LoginID = aobjP.UserName;

                        aDBManager.SaveChanges();
                    }

                }
                else
                {

                    aDBManager.Clients.Add(aobjP);
                    if (aDBManager.SaveChanges() > 0)
                        iClientID = aobjP.ID;

                    string password = Common.EncryptString(aobjP.Password);
                    aDBManager.UserMasters.Add(new UserMaster()
                    {
                        LoginID = aobjP.UserName,
                        Name = aobjP.Name,
                        Password = password,
                        EmailID = aobjP.EmailID,
                        ClientID = iClientID
                    });
                    aDBManager.SaveChanges();
                }

                return Json("Client Info Updated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Client Info not Updated Successfully...");

            }
        }

        [HttpPost]
        public ActionResult ClientInfoDelete(int aClientID)
        {
            try
            {
                var aitemList = aDBManager.Clients.SingleOrDefault(item => item.ID == aClientID);
                aitemList.IsActive = false;
                aDBManager.SaveChanges();
                
                return Json("Client Info Deactivated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Client Info not Deactivated Successfully...");
            }

        }
        #endregion


        #region Consignee
        public ActionResult ConsigneeMaster()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetConsigneeData()
        {
            try
            {
                var aConsigneeList = aDBManager.Consignees.ToList();

                return Json(new { aConsigneeList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult GetConsigneeDetails(int zConsigneeID)
        {
            try
            {
                var aItemList = aDBManager.Consignees.Single(i => i.ID == zConsigneeID);


                return Json(new { aItemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateConsigneeDetails(Consignee aobjP)
        {
            int iConsigneeID = 0;
            try
            {
                if (aobjP.ID != 0)
                {
                    string password = Common.EncryptString(aobjP.Password);
                    iConsigneeID = aobjP.ID;
                    var aitemList = aDBManager.Consignees.Single(item => item.ID == aobjP.ID);

                    aitemList.Name = aobjP.Name;
                    aitemList.EmailID = aobjP.EmailID;
                    aitemList.Address = aobjP.Address;
                    aitemList.District = aobjP.District;
                    aitemList.State = aobjP.State;
                    aitemList.Pincode = aobjP.Pincode;
                    aitemList.PrimaryMobileNo = aobjP.PrimaryMobileNo;
                    aitemList.SecondaryMobileNo = aobjP.SecondaryMobileNo;
                    aitemList.SecondaryEmailID = aobjP.SecondaryEmailID;
                    aitemList.UserName = aobjP.UserName;
                    aitemList.Password = aobjP.Password;
                    
                    aDBManager.SaveChanges();

                    var aUserMst = aDBManager.UserMasters.SingleOrDefault(u => u.ClientID == aobjP.ID);
                    if (aUserMst != null)
                    {
                        aUserMst.EmailID = aobjP.EmailID;
                        aUserMst.Password = password;
                        aUserMst.LoginID = aobjP.UserName;

                        aDBManager.SaveChanges();
                    }

                }
                else
                {

                    aDBManager.Consignees.Add(aobjP);
                    if (aDBManager.SaveChanges() > 0)
                        iConsigneeID = aobjP.ID;

                    string password = Common.EncryptString(aobjP.Password);
                    aDBManager.UserMasters.Add(new UserMaster()
                    {
                        LoginID = aobjP.UserName,
                        Name = aobjP.Name,
                        Password = password,
                        EmailID = aobjP.EmailID,
                        Consignee = iConsigneeID
                    });
                    aDBManager.SaveChanges();
                }

                return Json("Consignee Info Updated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Consignee Info not Updated Successfully...");

            }
        }

        [HttpPost]
        public ActionResult ConsigneeInfoDelete(int aConsigneeID)
        {
            try
            {
                var aitemList = aDBManager.Consignees.SingleOrDefault(item => item.ID == aConsigneeID);
                aitemList.IsActive = false;
                aDBManager.SaveChanges();

                return Json("Consignee Info Deactivated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Consignee Info not Deactivated Successfully...");
            }

        }
        #endregion

        #region PackageMaster
        public ActionResult PackageMaster()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetPackageData()
        {
            try
            {
                var aPackageList = aDBManager.PackageMasters.ToList();

                return Json(new { aPackageList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult GetPackageDetails(int zPackageID)
        {
            try
            {
                var aItemList = aDBManager.PackageMasters.Single(i => i.ID == zPackageID);


                return Json(new { aItemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdatePackageDetails(PackageMaster aobjP)
        {
            int iPackageID = 0;
            try
            {
                if (aobjP.ID != 0)
                {

                    iPackageID = aobjP.ID;
                    var aitemList = aDBManager.PackageMasters.Single(item => item.ID == aobjP.ID);

                    aitemList.PackageType = aobjP.PackageType;
                    aitemList.ShortCode = aobjP.ShortCode;
                    
                    aDBManager.SaveChanges();

                }
                else
                {

                    aDBManager.PackageMasters.Add(aobjP);
                    if (aDBManager.SaveChanges() <= 0)
                    {
                        return Json("Package Info Not Updated...");
                    }
                       
                }

                return Json("Package Info Updated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Package Info not Updated Successfully...");

            }
        }

        [HttpPost]
        public ActionResult PackageInfoDelete(int aPackageID)
        {
            try
            {
                var aitemList = aDBManager.PackageMasters.SingleOrDefault(item => item.ID == aPackageID);
                aitemList.IsActive = false;
                aDBManager.SaveChanges();

                return Json("Package Info Deactivated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Package Info not Deactivated Successfully...");
            }

        }
        #endregion

        #region CFSMaster
        public ActionResult CFSMaster()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetCFSData()
        {
            try
            {
                var aCFSList = aDBManager.CFSLocations.ToList();

                return Json(new { aCFSList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult GetCFSDetails(int zCFSID)
        {
            try
            {
                var aItemList = aDBManager.CFSLocations.Single(i => i.ID == zCFSID);


                return Json(new { aItemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateCFSDetails(CFSLocation aobjP)
        {
            int iPackageID = 0;
            try
            {
                if (aobjP.ID != 0)
                {

                    iPackageID = aobjP.ID;
                    var aitemList = aDBManager.CFSLocations.Single(item => item.ID == aobjP.ID);

                    aitemList.CFSLocation1 = aobjP.CFSLocation1;
                    aitemList.CFSCode = aobjP.CFSCode;

                    aDBManager.SaveChanges();

                }
                else
                {

                    aDBManager.CFSLocations.Add(aobjP);
                    if (aDBManager.SaveChanges() <= 0)
                    {
                        return Json("CFS Info Not Updated...");
                    }

                }

                return Json("CFS Info Updated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - CFS Info not Updated Successfully...");

            }
        }

        [HttpPost]
        public ActionResult CFSInfoDelete(int aCFSID)
        {
            try
            {
                var aitemList = aDBManager.CFSLocations.SingleOrDefault(item => item.ID == aCFSID);
                aitemList.IsActive = false;
                aDBManager.SaveChanges();

                return Json("CFS Info Deactivated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - CFS Info not Deactivated Successfully...");
            }

        }
        #endregion

        #region VesselMaster
        public ActionResult VesselMaster()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetVesselData()
        {
            try
            {
                var aVesselList = aDBManager.VesselMasters.ToList();

                return Json(new { aVesselList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(ex.Message);
            }
        }
        [HttpPost]
        public ActionResult GetVesselDetails(int zVesselID)
        {
            try
            {
                var aItemList = aDBManager.VesselMasters.Single(i => i.ID == zVesselID);


                return Json(new { aItemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult UpdateVesselDetails(VesselMaster aobjP)
        {
            int iVesselID = 0;
            try
            {
                if (aobjP.ID != 0)
                {

                    iVesselID = aobjP.ID;
                    var aitemList = aDBManager.VesselMasters.Single(item => item.ID == aobjP.ID);

                    aitemList.Name = aobjP.Name;
                    
                    aDBManager.SaveChanges();

                }
                else
                {

                    aDBManager.VesselMasters.Add(aobjP);
                    if (aDBManager.SaveChanges() <= 0)
                    {
                        return Json("Vessel Name Not Updated...");
                    }

                }

                return Json("Vessel Name Updated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Vessel Info not Updated Successfully...");

            }
        }

        [HttpPost]
        public ActionResult VesselInfoDelete(int aVesselID)
        {
            try
            {
                var aitemList = aDBManager.VesselMasters.SingleOrDefault(item => item.ID == aVesselID);
                aitemList.IsActive = false;
                aDBManager.SaveChanges();

                return Json("Vessel Info Deactivated Successfully...");
            }
            catch (Exception e)
            {
                return Json("Error - Vessel Info not Deactivated Successfully...");
            }

        }
        #endregion

        
    }
}