# Simple Code to store data in Localstorage using backbone view and router and Twitter Bootstrap #
1 ) I am using backbone framework + jquery + localstorage for developing this code.
    Application contains 3 directory




                 1--> lib (js Libraries  ie Backbone, bootstrap, jquery , underscorejs.etc)
                        2--> js
                              2.1--->Employee
                                     2.1.1--->util
                                                2.1.1.1---->memorystore.js
                                                            getter , setter for local storage.
                                                2.1.1.2 ---->utils.js
                                                            containing utilities methods, reusable method
                                     2.1.2---->View
                                               2.1.2.1----> templates
                                                            2.1.2.1.1---->EmployeeListView.html
                                                            2.1.2.1.2---->employeeVieewForm.html
                                                            2.1.2.1.3---->TopBar.html
                                               2.1.2.2----> employeeDetail.js
                                                            (Containing Two backbone view one for List and one for Form,
                                                             Events handers,
                                                             Validation)
                                               2.1.2.3----> header.js (view of header bar)
                                    2.1.3 ---->model
                                               2.1.3.1 --->models.js (default value set in model )


                                    2.1.3 ---->employeeMain.js  (Files initilized the application)
                        3--> Css
                        4--> index.html



