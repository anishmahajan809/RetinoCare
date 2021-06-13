# Retino Care Website
Deployed machine learning inference on Diabatic Retinopathy using this website.

The website is build using NodeJs for server side and mongoDB for the database.

The features are :

* when the user logins to site he/she can see all the uploads

* On the upload page the user can submit the image of the scanned eye with details of the patient and get the class of image back

* The user has to login again after 14 days after previous login.

* The website is responsive and also be accessed on samrtphones with beautifull UI.

The website uses the prebuilt Resnet model for the prediction . The server gets the image and then sends the image to python file and gets back class of the image.

The screenshots of the website running on localhost is in the "screenshots" folder. The model is not provided in this repo as the model is large in size.
