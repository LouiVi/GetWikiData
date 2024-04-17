cfg.Light, cfg.Portrait, cfg.MUI;
app.LoadPlugin( "Support" );
app.LoadPlugin( "DsNav" );
app.LoadPlugin( "Utils" );

var wikiPage;
//Create an action bar at the top.
function CreateActionBar()
{
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Bottom,Horizontal,FillX,Left" );
    layHoriz.SetBackGradient( utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[0], utils.GetGradientColors(rColor)[1], utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[1]);
    //color.PINK_LIGHT_4, color.PINK_DARK_2, color.PINK_ACCENT_2);
    lay.AddChild( layHoriz );
    layHoriz.SetSize( 1, 0.0679 )
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-wikipedia-w]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,2,12,10, "dip" );
    txtMenu.SetTextSize( 26 );
    txtMenu.SetTextColor( "white" );
txtMenu.SetTextShadow( 7, 2, 2, "#000000" );
    txtMenu.SetOnTouchUp( function(){FlipToBack();/*ChangePage( home, "Home" ),txtMenu.SetText( "[fa-home]"); */} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73);//, 0.08791 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( app.GetAppName(), -1,-1, "Left" );
    txtBarTitle.SetFontFile( "Misc/LuckiestGuy-Regular.ttf");//Misc/YoungSerif-Regular.ttf" );
    txtBarTitle.SetMargins(5,0,0,10,"dip");
    txtBarTitle.SetTextSize( 22 );
    txtBarTitle.SetTextColor( "#ffffff");
    
 txtBarTitle.SetTextShadow( 7, 2, 2, "#000000" );
    layBarTitle.AddChild( txtBarTitle );
    
        
    //Create search icon.
    txtSearch = app.CreateText( "[fa-power-off]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 5,2,0,10, "dip" );
    txtSearch.SetTextSize( 28  );
    txtSearch.SetTextColor( "#ffffff");
txtSearch.SetTextShadow( 7, 2, 2, "#000000" );
    txtSearch.SetOnTouchUp( function(){/*app.OpenDrawer()*/} );
    layHoriz.AddChild( txtSearch );
    
}



function OnKeyboardShown( shown )
{
    //app.ShowPopup( "Keyboard shown: " + shown );
}
//Called when application is started.
function OnStart()
{
utils = app.CreateUtils();
app.SetStatusBarColor(utils.RandomHexColor(true));
   app.SetNavBarColor(utils.RandomHexColor(true));

rColor = utils.RandomHexColor(false);//"#E3697A";
app.SetOnShowKeyboard( OnKeyboardShown )

db = app.OpenDatabase( "/storage/emulated/0/Download/sqlite/WikipediaMulti3.sqlite" )  
      
     //db.ExecuteSql("DROP TABLE Wiki_Data;");
    //Create a table (if it does not exist already).  
    //db.ExecuteSql( "CREATE TABLE IF NOT EXISTS Wiki_Data " +  
      //  "(id integer primary key AUTOINCREMENT, title text, url text, textContent text, htmlContent text, lang text)" )  
//db.ExecuteSql("CREATE VIEW IF NOT EXISTS WikiSortx AS SELECT * FROM Wiki_Data Order By title ASC");
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )
	CreateActionBar();
	layH = app.CreateLayout( "Linear", "Horizontal,FillX" )
lay.AddChild( layH );
layH.SetElevation( 15 );
layH.SetGravity( 45 );
rColor = utils.RandomHexColor(false);//"#E3697A";
layH.SetCornerRadius( 15 )
layH.SetBackGradient( utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[0], utils.GetGradientColors(rColor)[1], utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[1] )
txt = app.CreateTextEdit( "", 0.678, -1, "SingleLine,AutoSelect");
txt.SetHint( "Enter keyword to search" )
txt.SetOnEnter(  OnEnter );
txt.SetOnFocus(  OnFocus );
//txt.SetBackGradient(  )
	layH.AddChild( txt );
	btn = app.CreateButton( "[fa-search] Search", 0.322, -1,"Custom, FontAwesome" );
	btn.SetOnTouch( btn_OnTouch );
	btn.SetOnLongTouch( btn_OnTouch )
	layH.AddChild( btn );
	list = app.CreateList( "", 1, 0.87,"");
	rColor = "#dedede";
	list.SetBackGradient( utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[0], utils.GetGradientColors(rColor)[1], utils.GetGradientColors(utils.GetGradientColors(rColor)[1])[1] )
	list.SetOnTouch( list_OnTouch );
		list.SetOnLongTouch( list_OnLongTouch );
	list.SetFontFile( "Misc/LuckiestGuy-Regular.ttf");//Misc/Jersey10Charted-Regular.ttf" );
	lay.AddChild( list );
	list.SetTextColor1( "#343434" );
	list.SetTextColor2( "#ffffff" );
	list.SetTextSize( 14 )
	list.SetTextShadow( 5,2,2,"#efefef" )
	list.SetTextShadow2( 7,2,2,"#000000" )
	list.SetIconSize( 128, "px" )

	//Create a text label and add it to layout.
	//txt = app.CreateText( "Hello", 1, 0.1, "MultiLine" )
	//txt.SetTextSize( 16)
	//lay.AddChild( txt )
	
	//web = app.CreateWebView( 1, 0.9 );
	//lay.AddChild( web );
	//web.Gone();
		//Add layout to app.	
	app.AddLayout( lay );
//	i = setInterval(()=>{btn.SetOnTouch( btn_OnTouch );app.ShowPopup( "Hello" )}, 1000);
}

function OnEnter()
{
//web.Gone();
btn_OnTouch()
app.HideKeyboard()
/*if(btn.IsEnabled()) {
list.Hide();
btn.SetOnTouch( btn_OnTouch );
}*/
}

function OnFocus()
{
	//web.Gone();
	app.ShowKeyboard( txt )
	//list.Hide();
}


function btn_OnTouch()
{
app.HideKeyboard();
app.ShowProgress( "Searching ...", "NoDim,NonModal");
//app.ShowPopup( "Searching ..." );
	db.ExecuteSql( "select * from Wiki_Data Where textContent Like '%" + txt.GetText() + "%';", [], OnResult ) 
	//web.Gone();
	list.Animate( "NewsPaper" );
	layHoriz.Animate( "Bounce" );
}


function list_OnTouch(title, body, icon, index)
{
	db.ExecuteSql( "select textContent, htmlContent, lang from Wiki_Data Where title Like '%" + title + "%';", [], OnResult2 ) 
}

function list_OnLongTouch(title, body, icon, index)
{
	db.ExecuteSql( "select title, textContent, htmlContent, lang from Wiki_Data Where title Like '%" + title + "%';", [], OnResult3 ) 
}


//Callback to show query results in debug.  
function OnResult( results )   
{  
app.HideProgress();
    var s = "", t = "";
    var len = results.rows.length;
    app.ShowPopup(len + " results.","Long");
    
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)  
        s += item.id + ", " + item.title + ", " + item.textContent + "\r\n";
       /* if(len==1) t = item.title + ":" + item.lang +  ":Img/" + item.lang + ".png"
        if(i==0){}else{if(i<len-1) t+=",";}
        if(i<len-1) t += item.title + ":" + item.lang +  ":Img/" + item.lang +".png";*/
   switch (item.lang){
   	case "eng":
   if(len==1) t = item.title + ":Total words #^c^" + item.textContent.split(" ").length +  ":Img/" + item.lang + ".png"
        if(i==0){}else{if(i<len-1) t+=",";}
        if(i<len-1) t += item.title + ":Total words #^c^" + item.textContent.split(" ").length + ":Img/" + item.lang +".png";
  break;
      case "spa":
      if(len==1) t = item.title + ":Total de palabras #^c^" + item.textContent.split(" ").length +  ":Img/" + item.lang + ".png"
        if(i==0){}else{if(i<len-1) t+=",";}
        if(i<len-1) t += item.title + ":Total de palabras #^c^" + item.textContent.split(" ").length + ":Img/" + item.lang +".png";
        break;
        default:
     }  
    }
    //txt.SetText( s )
    list.SetList( t.split(",").sort().join(",")/*.replace(",,","")*/);
    app.SetClipboardText( t.split(",").sort().join(",").replace(",,",""));
    //JSON.stringify(list.GetList()) );
   // list.SetItemByIndex( 1, t.split(",").sort().join(",")[0], 21 )
    
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
        //window.open("", item.htmlContent);
        if(item.lang == "spa"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "es-co")
        }else if(item.lang == "fre"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "fr-fr")
        }else if(item.lang == "ita"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "it-it")
        }else if(item.lang == "eng"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "en-us")
        }
        //web.LoadHtml( item.htmlContent, "https://www.wikipedia.org");
        //list.Gone();
        //web.Animate( "FallRotate", null, 1250 );
        //s += item.id + ", " + item.title + ", " + item.textContent + "\r\n";
        //t += item.title + ",";
    }  
    //txt.SetText( s )
    //list.SetList( t );
    
}  

//Callback to show query results in debug.  
function OnResult3( results )   
{  
    var s = "", t = "";
    var len = results.rows.length;
    //alert(len + " results.");
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i)
        //window.open("", item.htmlContent);
       /* if(item.lang == "spa"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "es-co")
        }else if(item.lang == "fre"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "fr-fr")
        }else if(item.lang == "ita"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "it-it")
        }else if(item.lang == "eng"){
        app.TextToSpeech( item.textContent.replace("Search","").replace("Article Talk","").replace("Edit","").replace("Language","").replace("Watch","").replace("Buscar","").replace("Vigilar","").replace("Idioma",""), 1, 1, null, null, "en-us")
        }
        */
        wikiPage = item.htmlContent;
        //Create a wizard dialog.
    wiz = app.CreateWizard( item.title, 1, 1, OnWizard  )
    wiz.Show()

        //web.LoadHtml( item.htmlContent, "https://www.wikipedia.org");
        //list.Gone();
        //web.Animate( "FallRotate", null, 1250 );
        //s += item.id + ", " + item.title + ", " + item.textContent + "\r\n";
        //t += item.title + ",";
    }  
    //txt.SetText( s )
    //list.SetList( t );
    
}  

//Handle wizard pages.
function OnWizard( lay, page )
{
    console.log( "Wizard page:" + page  )
    
    if( page==0 ) //<-- Page zero is for setup.
    {
    
    web = app.CreateWebView( 1,1 );
        //Create text box for user instructions.
        //wizTxt = app.CreateText( "", -1,-1,"MultiLine" )
        //wizTxt.SetTextSize( 19 )
        //wizTxt.SetTextColor( "#555555" )
        lay.AddChild( web )
        
        //Create controls for wizard (some can start hidden).
        wizFrm = app.CreateLayout( "Frame" )
        wizFrm.SetMargins( 0,0.05,0,0 )
        wizFrm.SetBackground( "/res/drawable/picture_frame" )
        wizFrm.Gone()
        lay.AddChild( wizFrm )
        
       /* wizImg = app.CreateImage( "/Sys/Img/Hello.png", 0.1, -1, "button" ) 
        wizImg.SetOnTouchUp( function(){ app.ShowPopup("Button Pressed")} )
        wizFrm.AddChild( wizImg )
        
        //Create text box for checkered flag icon.
        wizFlag = app.CreateText( "[fa-flag-checkered]",-1,-1,"FontAwesome" )
        wizFlag.SetMargins( 0,0.05,0,0 )
        wizFlag.SetTextSize( 64 )
        wizFlag.Gone()
        lay.AddChild( wizFlag )*/
        
    }
    else if( page==1 ) {
        //var msg = "This is the first page of your wizard";
        //wizTxt.SetText( msg )
        web.LoadHtml( wikiPage, "https://wikipedia.org/" )
        wizFrm.Gone()
    }
    else if( page==2 ) {
        var msg = "This second page contains an image button\n\nYou can put any"
            + " controls you like here, including a webview and have as many"
            + " pages as you like"
        web.LoadHtml( msg )
        wizFrm.Show() //<-- make the image button visible on this page only
        wizFlag.Gone()
    }
    else if( page==3 ) {
       var msg = "Wizard complete!"
       web.LoadHtml( msg ) 
       wizFrm.Gone()
       //wizFlag.Show()
       wiz.Finish()
    }
    else if( page==4 ) 
    {
       wiz.Dismiss()
       app.ShowPopup( "Wizard finished" )
    }
    else if( page < 0 )
    {
        app.ShowPopup( "Wizard cancelled" )
    }
}

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg )  
    console.log( "Error: " + msg )  
}  