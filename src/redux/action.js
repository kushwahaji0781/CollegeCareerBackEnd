export const Load_State_Table = 'Load_State_Table';
export const Load_City_Table = 'Load_City_Table';
export const Load_Area_Table = 'Load_Area_Table';
export const Load_College_Table = 'Load_College_Table';
export const Load_Product_Table = 'Load_Product_Table';
export const Load_Registration_Table = 'Load_Registration_Table';
export const Load_RegistrationImage_Table = 'Load_RegistrationImage_Table';
export const Load_MemberRegistration_Table = 'Load_MemberRegistration_Table';
export const Load_MemberRegistrationImg_Table = 'Load_MemberRegistrationImg_Table';
export const Login_Admin_Data = 'Login_Admin_Data';
export const Load_Admin_Data = 'Load_Admin_Data';

const loadData = "https://collegecareerportal-c0be7-default-rtdb.firebaseio.com";


export const load_StateData = () =>
{
 
        return async dispatch => 
        {
            try 
            {
                const result = await fetch (`${loadData}/state_table.json`,
                  {
                    method:'GET',
                    headers:{'Content-Type':'application/json'}
                  }
              );
            
              const state_data = await result.json();
          
               if (state_data) 
                 {
                   dispatch
                    ({
                       type:Load_State_Table,
                       loadData:state_data
                    }) 
                 }            
                else 
                {
                  console.log("State data not  fetch");
                }
           }
       
            catch(error)
             {
               console.log('error');
             } 
        }
 }
    export const load_CityData = () =>
    {

        return async dispatch =>
        {
            try 
            {
                const result = await fetch (`${loadData}/city_table.json`,
                  {
                    method:'GET',
                    headers:{'Content-Type':'application/json'}
                  }
                );
                
                  
               const city_data = await result.json();
          
               if (city_data) 
                {
                 dispatch ({
                    type:Load_City_Table,
                    loadData:city_data
                   }) 
                }            
               else 
               {
                console.log("City data not fetch");
               }
           }
       
           catch(error)
            {
              console.log('error');
            }
        }
    }

export const load_AreaData = () =>
{

    return async dispatch =>
    {
        try 
        {
            const result = await fetch (`${loadData}/area_table.json`,
              {
                method:'GET',
                headers:{'Content-Type':'application/json'}
              }
            );
            
              
           const area_data = await result.json();
  
           if (area_data) 
            {
             dispatch ({
                type:Load_Area_Table,
                loadData:area_data
               }) 
            }            
           else 
           {
            console.log("area data not  fetch");
           }
       }
   
       catch(error)
        {
          console.log('error');
        }
    }
}
export const load_CollegeData = () =>
{

    return async dispatch =>
    {
        try 
        {
            const result = await fetch (`${loadData}/college_table.json`,
              {
                method:'GET',
                headers:{'Content-Type':'application/json'}
              }
            );
            
              
           const college_data = await result.json();
       
           if (college_data) 
            {
             dispatch ({
                type:Load_College_Table,
                loadData:college_data
               }) 
            }            
           else 
           {
            console.log("college data not  fetch");
           }
       }
   
       catch(error)
        {
          console.log('error');
        }
    }
}
export const load_ProductData = (mob) =>
{

    return async dispatch =>
    {
        try 
        {
            const result = await fetch (`${loadData}/product_table/${mob}.json`,
              {
                method:'GET',
                headers:{'Content-Type':'application/json'}
              }
            );
            
              
           const product_data = await result.json();
       
           if (product_data) 
            {
             dispatch ({
                type:Load_Product_Table,
                loadData:product_data
               }) 
            }            
           else 
           {
            console.log("product data not  fetch");
           }
       }
   
       catch(error)
        {
          console.log('error');
        }
    }
}


export const load_RegistrationData = (stnm,ctnm,arnm) =>
{
 
    return async dispatch =>
    {  
    
        try 
        {    
            const result = await fetch (`${loadData}/user/${stnm}/${ctnm}/${arnm}/user_reg.json`,
              {
                method:'GET',
                headers:{'Content-Type':'application/json'}
              }
            );       
           const regis_data = await result.json();
           
          //  console.log("deepak data",regis_data);
           if (regis_data) 
            {
              load_RegistrationImageData(stnm,ctnm,arnm)  

             dispatch ({
                type:Load_Registration_Table,
                loadData:regis_data
               }) 
            }            
           else 
           { 
            console.log("Registration data not  fetch");
           }
       }
   
       catch(error)
        {
          console.log('error');
        }
    }
}

export const load_MemberRegisData = () =>
{
 
        return async dispatch => 
        {
            try 
            {
                const result = await fetch (`${loadData}/member_regis_table/member_data.json`,
                  {
                    method:'GET',
                    headers:{'Content-Type':'application/json'}
                  }
              );
            
              const member_regis_data = await result.json();
          
               if (member_regis_data) 
                 {
                   dispatch
                    ({
                       type:Load_MemberRegistration_Table,
                       loadData:member_regis_data
                    }) 
                 }            
                else 
                {
                  console.log("Member registration  data not  fetch");
                }
           }
       
            catch(error)
             {
               console.log('error');
             } 
        }
 }
export const load_MemberRegisImg = () =>
{
 
        return async dispatch => 
        {
            try 
            {
                const result = await fetch (`${loadData}/member_regis_table/member_img.json`,
                  {
                    method:'GET',
                    headers:{'Content-Type':'application/json'}
                  }
              );
            
              const member_regis_img = await result.json();
          
               if (member_regis_img) 
                 {
                   dispatch
                    ({
                       type:Load_MemberRegistrationImg_Table,
                       loadData:member_regis_img
                    }) 
                 }            
                else 
                {
                  console.log("Member registration image not  fetch");
                }
           }
       
            catch(error)
             {
               console.log('error');
             } 
        }
 }
////////////////////////////////login mamber derails
 export const LoginAdmin=(LoginUser)=>{
  return dispatch=>{
    dispatch({
        type:Login_Admin_Data,
        loadData:LoginUser
    })
  }
}
//registration report image data  
export const load_RegistrationImageData = (stnm,ctnm,arnm) =>
{
 
  load_RegistrationData(stnm,ctnm,arnm);
    return async dispatch =>
    {  
    
        try 
        {    
            const result = await fetch (`${loadData}/user/${stnm}/${ctnm}/${arnm}/user_regis_img.json`,
              {
                method:'GET',
                headers:{'Content-Type':'application/json'}
              }
            );       
           const regis_image = await result.json();
           
      
           if (regis_image) 
            {  
             dispatch ({
                type:Load_RegistrationImage_Table,
                loadData:regis_image
               }) 
            }            
           else 
           { 
            console.log("Registration image  not  fetch");
           }
       }
   
       catch(error)
        {
          console.log('error');
        }
    }
}
export const load_AdminData = () =>
{
 
        return async dispatch => 
        {
            try 
            {
                const result = await fetch (`${loadData}/admin_table.json`,
                  {
                    method:'GET',
                    headers:{'Content-Type':'application/json'}
                  }
              );
            
              const admin_data = await result.json();
          
               if (admin_data) 
                 {
                   dispatch
                    ({
                       type:Load_Admin_Data,
                       loadData:admin_data
                    }) 
                 }            
                else 
                {
                  console.log("admin data not  fetch");
                }
           }
       
            catch(error)
             {
               console.log('error');
             } 
        }
 }