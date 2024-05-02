using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Text;
using System.IO;
using System.Web.Mvc;
using System.IO.Compression;

namespace Cargo.Models
{
    public class Common
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static string ToTitleCase(string str)
        {
            return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str.ToLower());
        }


        
        public static string EncryptString(string zstrP)
        {
            string zstr = string.Empty;
            char sChar;


            for (int i = 0; i < zstrP.Length; i++)
            {
                sChar = Convert.ToChar(Mid(zstrP, i, 1));
                int ninP = sChar;
                byte val = (byte)(ninP + zstrP.Length);
                zstr += Encoding.Default.GetString(new byte[] { val });
            }

            return zstr;

        }

        public static string DecryptString(string zstrP)
        {
            string zstr = string.Empty;
            char sChar;


            for (int i = 0; i < zstrP.Length; i++)
            {
                sChar = Convert.ToChar(Mid(zstrP, i, 1));
                int ninP = sChar;
                byte val = (byte)(ninP - zstrP.Length);
                zstr += Encoding.Default.GetString(new byte[] { val });
            }

            return zstr;


        }

        public static string Mid(string s, int start, int length)
        {
            if (start > s.Length || start < 0)
            {
                return s;
            }

            if (start + length > s.Length)
            {
                length = s.Length - start;
            }

            string ret = s.Substring(start, length);
            return ret;
        }

        public static string CheckDirectory(string path)
        {
            try
            {
                if (!Directory.Exists(path))
                {
                    var isDir = Directory.CreateDirectory(path).Exists;

                }
                return path;
            }
            catch (Exception)
            {
                return path;
            }
        }
        public static void DeleteDirectory(string target_dir)
        {
            try
            {
                string[] files = Directory.GetFiles(target_dir);
                string[] dirs = Directory.GetDirectories(target_dir);

                foreach (string file in files)
                {
                    System.IO.File.SetAttributes(file, FileAttributes.Normal);
                    System.IO.File.Delete(file);
                }

                foreach (string dir in dirs)
                {
                    DeleteDirectory(dir);
                }

                Directory.Delete(target_dir, false);
            }
            catch (Exception)
            {

            }
        }
       
        //public static void CreateZIP(string zpathL, string zZipNameP, string zZipPathP)
        //{

        //    string path = zpathL;//Location for inside Test Folder  
        //    string[] Filenames = Directory.GetFiles(path);

        //    if (!Directory.Exists(zZipPathP))
        //        Directory.CreateDirectory(zZipPathP);

        //    using (ZipFile zip = new ZipFile())
        //    {
        //        zip.AddFiles(Filenames, zZipNameP.Replace(".zip",""));
        //        zip.Save(Path.Combine(zZipPathP + "/" + zZipNameP));
        //        Common.DeleteDirectory(zpathL);
        //    }


        //}
      
    }
}
public class Book_ActivityList
{
    public string Activity { get; set; }
    public decimal Percentage { get; set; }

    public decimal Days { get; set; }

    public Nullable<DateTime> ScheduleDate { get; set; }
    public Nullable<DateTime> RevisedDate { get; set; }
    public Nullable<DateTime> CompletedDate { get; set; }
}


public class GlobalTaskList
{
    public int id { get; set; }
    public string title { get; set; }

    public Nullable<DateTime> start { get; set; }
    public Nullable<DateTime> end { get; set; }
    public string description { get; set; }
    public string url { get; set; }
    public string color { get; set; }
    public string Duration { get; set; }
}

public class LowercaseJsonSerializer
{
    private static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
    {
        ContractResolver = new LowercaseContractResolver()
    };

    public static string SerializeObject(object o)
    {
        return JsonConvert.SerializeObject(o, Formatting.Indented, Settings);
    }

    public class LowercaseContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            return propertyName.ToLower();
        }
    }
}
