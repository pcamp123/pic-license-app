enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "ACL"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true},
			{content: "Thank you for using our app! Please use one of the buttons below to register your software!"}
			]},

		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", name: "eulaButton", content: "Read EULA", ontap: "readEulaTap"},
			{kind: "onyx.Button", name: "licenseButton", disabled: true, content: "License", ontap: "licenseTap"},
		]},

		// This is the popup so you can display the EULA
		{name: "eulaPopup", kind: "onyx.Popup", floating: true, centered: true,
            style: "background-color: grey; padding: 10px", onHide: "popupHidden", components: [
                {content: "we will put the eula text in here"},
                {tag: "br"},
                {kind: "onyx.Button", content: "Disagree", style: "width: 50%", classes: "onyx-negative", ontap:"eulaButtonDisagreed"},
                {kind: "onyx.Button", content: "Agree", style: "width: 50%", classes: "onyx-affirmative", ontap:"eulaButtonAgreed"}, ]
        },

        {name: "licenseQuestionPopup", kind: "onyx.Popup", floating: true, centered: true, 
        	style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
        		{content: "Do you already own an ACL license?"},
                {tag: "br"},
                {kind: "onyx.Button", content: "No", style: "width: 50%", classes: "onyx-negative", ontap:"licensePopupNo"},
                {kind: "onyx.Button", content: "Yes", style: "width: 50%", classes: "onyx-affirmative", ontap:"licensePopupYes"},
        ]},

        {name: "purchaseLicensePopup", kind: "onyx.Popup", floating: true, centered: true,
    		style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
    			{content: "Would you like to purchase the Application Compatibility Layer from OpenMobile and Phoenix International Communications?"},
				{tag: "br"},
                {kind: "onyx.Button", content: "No", style: "width: 50%", classes: "onyx-negative", ontap:"purchaseLicensePopupNo"},
                {kind: "onyx.Button", content: "Yes", style: "width: 50%", classes: "onyx-affirmative", ontap:"purchaseLicensePopupYes"},
    	]},

    	{name: "enterLicenseKeyPopup", kind: "onyx.Popup", floating: true, centered: true,
    		style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
    			{content: "Please enter your license key:"},
    			{kind: "onyx.Input", name: "licenseKey", placeholder: "Enter license key...", onchange: "licenseChange"},
				{tag: "br"},
                {kind: "onyx.Button", content: "Cancel", style: "width: 50%", classes: "onyx-negative", ontap:"enterLicenseKeyPopupNo"},
                {kind: "onyx.Button", content: "Enter", style: "width: 50%", classes: "onyx-affirmative", ontap:"enterLicenseKeyPopupYes"},
    	]},

		{name: "licenseKeyEnteredPopup", kind: "onyx.Popup", floating: true, centered: true,
    		style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
    			{content: "You correctly entered your license key! The key was: "},
    			{name: "licenseEntry", content: "NO LICENSE ENTERED"},
				{tag: "br"},
                {kind: "onyx.Button", content: "OK", style: "width: 100%", classes: "onyx-affirmative", ontap:"licenseKeyEnteredPopupOk"},
    	]},   

    	{name: "licenseKeyNullPopup", kind: "onyx.Popup", floating: true, centered: true, 
    		style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
    			{content: "You entered no license key! Please return to the previous screen and enter a license key"},
				{tag: "br"},
                {kind: "onyx.Button", content: "OK", style: "width: 100%", classes: "onyx-affirmative", ontap:"licenseKeyNullPopupOk"},
    	]},  

    	{name: "paymentPopup", kind: "onyx.Popup", floating: true, centered: true, 
    		style: "background-color: grey, padding: 10px", onHide: "popupHidden", components: [
    			{kind: "BasicWebView", name: "paymentWebview", url: "http://www.paypal.com/", style: "width: 100%", style: "hight: 100%"},
				{tag: "br"},
                {kind: "onyx.Button", content: "OK", style: "width: 100%", classes: "onyx-affirmative", ontap:"paymentPopupOk"},
    	]},  

    	],

    paymentPopupOk: function(inSender, inEvent) {
    	this.$.paymentPopup.hide();
    },

    licenseKeyEnteredPopupOk: function(inSender, inEvent) {
    	this.$.licenseKeyEnteredPopup.hide();
    },

    enterLicenseKeyPopupNo: function(inSender, inEvent) {
    	this.$.enterLicenseKeyPopup.hide();
    },

    licenseKeyNullPopupOk: function(inSender, inEvent) {
    	this.$.licenseKeyNullPopup.hide();
    	this.$.enterLicenseKeyPopup.show();
    },

    enterLicenseKeyPopupYes: function(inSender, inEvent) {
    	this.$.purchaseLicensePopup.hide();

    	//get the license value
		licenseValue = this.$.licenseKey.getValue();

		this.log(licenseValue);

		this.$.enterLicenseKeyPopup.hide();

		if (licenseValue.length === 0)
		{
			this.$.licenseKeyNullPopup.show();
		}
		else
		{
			this.$.enterLicenseKeyPopup.hide();
			this.$.licenseKeyEnteredPopup.show();
			this.$.licenseEntry.setContent(licenseValue);
		}
    },

    purchaseLicensePopupNo: function(inSender, inEvent, paymentUrl) {
    	this.$.purchaseLicensePopup.hide();
    },

    purchaseLicensePopupYes: function(inSender, inEvent) {
    	this.$.purchaseLicensePopup.hide();
    	this.$.paymentPopup.show();
    	this.log("Called the purchase popup");

    	//This is for when we impliment OAuth, so we can set the URL of the webview.
    	//this.$.paymentWebview.setUrl(paymentUrl);
    },

	licensePopupNo: function(inSender, inEvent) {
		this.$.licenseQuestionPopup.hide();
		this.$.purchaseLicensePopup.show();
	},

	licensePopupYes: function(inSender, inEvent) {
		this.$.licenseQuestionPopup.hide();
		this.$.enterLicenseKeyPopup.show();
	},

	eulaButtonDisagreed: function(inSender, inEvent) {
		this.$.eulaPopup.hide();
	},

	eulaButtonAgreed: function(inSender, inEvent) {
		this.$.eulaPopup.hide();

		this.$.licenseButton.setDisabled(false);

		this.$.eulaButton.setDisabled(true);
	},

	licenseTap: function(inSender, inEvent) {
		this.$.licenseQuestionPopup.show();
	},

	readEulaTap: function(inSender, inEvent) {
		this.$.eulaPopup.show();
	},

	licenseChange: function(insender, inEvent) {
		//get the value of the textbox

		licenseValue = this.$.licenseKey.getValue();


		if (licenseValue == null)
		{
			this.$.licenseButton.setDisabled(true)
		}
		else
		{
			this.$.licenseButton.setDisabled(false);
		};

		//turn it into a variable 
		var licenseKeyContent = licenseValue;

		this.log(licenseKeyContent + " this is the key content");
		this.log(licenseValue + " this is the license value");
		this.log(this.$.licenseKey.getValue() + " this is the getValue");

	},

	eulaCheckboxChanged: function(inSender, inEvent) {	
		if ( inSender.checked == true)
		{
			this.$.licenseKey.setDisabled(false);
		}
		else
		{
			this.$.licenseKey.setDisabled(true);
		}
	}

});
