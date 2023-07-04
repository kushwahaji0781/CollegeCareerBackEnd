const INIT_STATE =
 {
    LoadState:[],
    LoadCity:[],
    LoadArea:[],
    CollegeType:[],
    ProductData:[],
    RegisData:[],
    RegisImage:[],
    MemberRegisData:[],
    MemberRegisImg:[],
    AdminData:[],
    LoginUser:[],
    RegistrationData:[]
 };

export const cartreducer = (state = INIT_STATE, action) =>
 {
    switch (action.type) 
    {
       case "Load_State_Table" :
            return{...state,LoadState:action.loadData};
       case "Load_City_Table" :
            return{...state,LoadCity:action.loadData};
       case "Load_Area_Table" :
            return{...state,LoadArea:action.loadData};
      case "Load_College_Table" :
            return{...state,CollegeType:action.loadData};
      case "Load_Product_Table" :
            return{...state,ProductData:action.loadData};
      case "Load_Registration_Table" :
            return{...state,RegisData:action.loadData};  
      case "Load_MemberRegistration_Table" :
            return{...state,MemberRegisData:action.loadData};  
      case "Load_MemberRegistrationImg_Table" :
            return{...state,MemberRegisImg:action.loadData};    
      case "Login_Admin_Data" :
            return{...state,LoginUser:action.loadData};   
      case "Load_RegistrationImage_Table" :
            return{...state,RegisImage:action.loadData};  
      case "Load_Admin_Data" :
            return{...state,AdminData:action.loadData};  
      case "Load_Regis_Data" :
            return{...state,RegistrationData:action.loadData};  
        default:
            return state
    }
}