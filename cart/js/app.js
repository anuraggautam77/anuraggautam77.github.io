/**
 * Created by anurag on 18-02-2017.
 */

 class APPLICATION {
     
    constructor (){
        this.jsonPath = "assets/cart.json";
     }
  invokeApp() {
      this.getjsonData();

   }

  getjsonData() {

      window.utils.callTofile(this.jsonPath, (data)=>{
      window.utils.setJsonData(data);
         var cart = new CartApp(),  promo = new PromoCode(), discount = new Discount(),  estimatedtotal = new EstimatedTotal();
         cart.init(); promo.init();  discount.init();   estimatedtotal.init();
  });

}


};

var app = new APPLICATION();
app.invokeApp();