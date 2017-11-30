window.Store={
    
    
    setDataInStorage:function(data,key){
         localStorage.setItem(key,JSON.stringify(data))
     },
    
    getDataFromStaorage:function(key,id){
        var record=null;
        var wholeDataString=localStorage.getItem(key);
        var arrWholeData=JSON.parse(wholeDataString);
         if(id){
           record  =this.getDataFromAnArray(arrWholeData,id,"id")
        }else{
           record=arrWholeData
        }
        return record;
    },
    getDataFromAnArray:function(arr,id,key){
        
           for (var i in arr) {
               if( arr[i][key]==id){
                 return arr[i];    
               }
           }
        
    }
    
    
};
