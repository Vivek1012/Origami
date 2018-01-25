(function () {
    "use strict";
    var contents;
	var start = Windows.UI.StartScreen;


    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {


        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

                
        

        ready: function (element, options) {
            var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);
            element.querySelector(".titlearea .pagetitle").textContent = item.group.title;
            document.getElementById("bu1").addEventListener("click", next, false);
            document.getElementById("bu2").addEventListener("click", pre, false);
            element.querySelector("article .item-title").textContent = item.title;
            //element.querySelector("article .item-subtitle").textContent = item.subtitle;
            element.querySelector("article .item-image").src = item.backgroundImage;
       //     element.querySelector("article .item-image1").src = item.Image1; 
            element.querySelector("article .item-image").alt = item.subtitle;
            element.querySelector("article .item-content").innerHTML = item.content;
            element.querySelector(".content").focus();
     
            var i = 0;
            var j = 1;

            function next() {

                    document.querySelector("article .item-image1").src = contents[i + 2];
                    document.getElementById('description').innerHTML = contents[j + 2];
                    i = i + 2;
                    j = j + 2;

                     if (i == contents.length - 2) {
                        document.getElementById('bu1').disabled = true;
                
                         }

                    if (i > 0) {
                    document.getElementById('bu2').disabled = false;
                    }
                }



            function pre() {

                document.querySelector("article .item-image1").src = contents[i - 2];
                document.getElementById('description').innerHTML = contents[j - 2];
                i = i - 2;
                j = j - 2;

                if (i == 0) {
                    document.getElementById('bu2').disabled = true;
                }

                if (i > 0) {
                    document.getElementById('bu1').disabled = false;
                }
            }
            
            //var contents = '{"image1":"images/folds/mountain fold/mountain-fold_02.jpg","image2":"images/folds/mountain fold/mountain-fold_03.jpg","image3":"images/folds/mountain fold/valley-fold_01.jpg"}';
           
            //var image = JSON.parse(contents);

            WinJS.xhr({ url: item.path }).then(function (xhr) {
             contents = JSON.parse(xhr.responseText);
             
             element.querySelector("article .item-image1").src = contents[i];
             document.getElementById('description').innerHTML = contents[j];
                // Add the items to the WinJS.Binding.List
            
                	document.getElementById("pin").addEventListener("click", function (e) {
	    var uri = new Windows.Foundation.Uri("ms-appx:///" + item.tileImage);
	
    var tile = new start.SecondaryTile(
	        item.key,                                    // Tile ID
	        item.shortTitle,                             // Tile short name
	        item.title,                                  // Tile display name
	        JSON.stringify(Data.getItemReference(item)), // Activation argument
	        start.TileOptions.showNameOnLogo,            // Tile options
	        uri                                          // Tile logo URI
	    );
	
	    tile.requestCreateAsync();
	});

      });

            
        }





    });

    
    

   

})();
