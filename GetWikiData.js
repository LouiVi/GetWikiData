cfg.Light;

//Called when application is started.
function OnStart()
{

db = app.OpenDatabase( "/storage/emulated/0/Download/sqlite/WikipediaMulti3.sqlite" )  
      
     //db.ExecuteSql("DROP TABLE Wiki_Data;");
    //Create a table (if it does not exist already).  
    //db.ExecuteSql( "CREATE TABLE IF NOT EXISTS Wiki_Data " +  
      //  "(id integer primary key AUTOINCREMENT, title text, url text, textContent text, htmlContent text, lang text)" )  
//db.ExecuteSql("CREATE VIEW IF NOT EXISTS WikiSortx AS SELECT * FROM Wiki_Data Order By title ASC");
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	//txt = app.CreateText( "Hello", 1, 0.1, "MultiLine" )
	//txt.SetTextSize( 16)
	//lay.AddChild( txt )
	
	web = app.CreateWebView( 1, 1 );
	lay.AddChild( web );
	web.Gone();
	list = app.CreateList( "", 1, 1,"WhiteGrad,html" );
	list.SetOnTouch( list_OnTouch )
	lay.AddChild( list );
	//Add layout to app.	
	app.AddLayout( lay )
	db.ExecuteSql( "select * from Wiki_Data Where textContent Like '%" + prompt("What you want to search?",'') + "%';", [], OnResult ) 
}


function list_OnTouch(title, body, icon, index)
{
	db.ExecuteSql( "select textContent, htmlContent from Wiki_Data Where title Like '%" + title + "%';", [], OnResult2 ) 
}


//Callback to show query results in debug.  
function OnResult( results )   
{  
    var s = "", t = "";
    var len = results.rows.length;
    alert(len + " results.");
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += item.id + ", " + item.title + ", " + item.textContent + "\r\n";
        t += item.title + ",";
    }  
    //txt.SetText( s )
    list.SetList( t );
    
}  

//Callback to show query results in debug.  
function OnResult2( results )   
{  
    var s = "", t = "";
    var len = results.rows.length;
    //alert(len + " results.");
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)
        web.LoadHtml( item.htmlContent, "https://www.wikipedia.org");
        list.Gone();
        web.Animate( "FallRotate", null, 1250 );
        //s += item.id + ", " + item.title + ", " + item.textContent + "\r\n";
        //t += item.title + ",";
    }  
    //txt.SetText( s )
    //list.SetList( t );
    
}  

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg )  
    console.log( "Error: " + msg )  
}  