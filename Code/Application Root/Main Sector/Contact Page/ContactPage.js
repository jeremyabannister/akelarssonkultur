class ContactPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.state = {
			readyToClose: true
		}
		this.subdued = false
		
		this.scrollable = false
		
		// Parameters
		
		this.parameters = {
			reservedTopBuffer: 0,
			
			fractionOfAvailableContentWidthForBioParagraph: (5.0/7.0),
			bufferBetweenBioParagraphAndProfilePicture: 50,
			rightBufferForProfilePicture: 100,
			topBufferForProfilePicture: 30,
			sizeOfProfilePicture: 250,
			
			topBufferForPhoneNumberLabel: 30,
			topBufferForEmailAddressLabel: 10,
			
			leftBufferForBioParagraph: 200,
			topBufferForBioParagraph: 10,
			
			topBufferForMissionsParagraph: 70,
			
			profilePictureAspectRatio: (1.0/1.0),
		}
		
		this.bottomBufferForEmailAddress = 60
		
		// UI
		this.scrollBuffer = new JABView('ScrollBuffer')
		
		
		this.profilePicture = new JABImageView('ProfilePicture')
		this.bioParagraph = new TitledParagraph('BioParagraph')
		this.missionsParagraph = new TitledParagraph('MissionsParagraph')
		
		this.line = new JABView("Line")
		this.phoneNumberLabel = new UILabel('PhoneNumberLabel')
		this.emailAddressLabel = new UILabel('EmailAddressLabel')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
		this.startEventListeners()
	}
	
	
	
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addScrollBuffer()
		
		
		this.addProfilePicture()
		this.addBioParagraph()
		this.addMissionsParagraph()
		
		this.addLine()
		this.addPhoneNumberLabel()
		this.addEmailAddressLabel()
		
	}
	
	
	
	addScrollBuffer () {
		this.addSubview(this.scrollBuffer)
	}
	
	
	
	
	
	
	
	addProfilePicture () {
		this.addSubview(this.profilePicture)
	}
	
	addBioParagraph () {
		this.addSubview(this.bioParagraph)
	}
	
	addMissionsParagraph () {
		this.addSubview(this.missionsParagraph)
	}
	
	
	
	
	addLine () {
		this.addSubview(this.line)
	}
	
	addPhoneNumberLabel () {
		this.addSubview(this.phoneNumberLabel)
	}
	
	addEmailAddressLabel () {
		this.addSubview(this.emailAddressLabel)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		this.configureScrollBuffer()
		this.positionScrollBuffer()
		
		
		
		this.configureProfilePicture()
		this.positionProfilePicture()
		
		this.configurePhoneNumberLabel()
		this.positionPhoneNumberLabel()
		
		this.configureEmailAddressLabel()
		this.positionEmailAddressLabel()
		
		this.configureLine()
		this.positionLine()
		
		
		
		this.configureBioParagraph()
		this.positionBioParagraph()
		
		this.configureMissionsParagraph()
		this.positionMissionsParagraph()
		
	}
	
	
	// Parameters
	updateParameters () {
		
		if (sizeClass == 'xxs' || sizeClass == 'xs') {
			this.parameters.fractionOfAvailableContentWidthForBioTextLabel = (6.0/7.0)
		} else {
			this.parameters.fractionOfAvailableContentWidthForBioTextLabel = (5.0/7.0)
		}
		
	}
	
	
	
	
	// Scroll Buffer
	configureScrollBuffer () {
		
		var view = this.scrollBuffer
		
		view.backgroundColor = this.backgroundColor
		
	}
	
	positionScrollBuffer () {
		var view = this.scrollBuffer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height + 50
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.size.height = this.emailAddressLabel.bottom + 50
		}

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
		
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	
	
	// Profile Picture
	configureProfilePicture () {
		let view = this.profilePicture
		
		view.src = resourcesDirectory + '/Images/Contact Page/Profile Picture.jpg'
	}
	
	positionProfilePicture () {
		
		let view = this.profilePicture
		let newFrame = new CGRect()
							
		newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * (1 - this.parameters.fractionOfAvailableContentWidthForBioParagraph)
		newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio

		newFrame.origin.x = this.width - newFrame.size.width - (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForProfilePicture
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.size.width = applicationRoot.contentWidth * 0.5
			newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio
			
			newFrame.origin.x = (this.width - newFrame.size.width)/2
		}
							
		view.frame = newFrame
	}
	
	
	
	//Line
	configureLine () {
		let view = this.line
		view.backgroundColor = 'white'
		view.opacity = {true: 1, false: 0}[!this.subdued]
	}

	positionLine () {
		var newFrame = new CGRect()
					
		newFrame.size.width = 60
		newFrame.size.height = 1

		newFrame.origin.x = this.emailAddressLabel.x
		newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25
					
		this.line.frame = newFrame
	}
	
	
	
	// Phone Number Label
	configurePhoneNumberLabel () {
		var view = this.phoneNumberLabel
		view.text = "telefon &nbsp;:: &nbsp;<span id='phoneNumber---" + this.id + "' style='color:black; cursor: pointer'>070-683-5708</span>"
		
		view.textColor = '#999999'
		view.fontSize = {'xxs': 16, 'xs': 20, 's': 13, 'm': 13, 'l': 13, 'xl': 13}[sizeClass]
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		
		view.opacity = {true: 1, false: 0}[!this.subdued]
	}
	
	positionPhoneNumberLabel () {
		let view = this.phoneNumberLabel
		let size = view.font.sizeOfString(view.text)
		let newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.profilePicture.left + (this.profilePicture.width - newFrame.size.width)/2
		newFrame.origin.y = this.profilePicture.bottom + this.parameters.topBufferForPhoneNumberLabel
					
		view.frame = newFrame
	}
	
	
	// Email Address Label
	configureEmailAddressLabel () {
		let view = this.emailAddressLabel
		view.text = "mejl &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:black; cursor: pointer'>al.kult.utb@gmail.com</span>"
		
		view.textColor = '#999999'
		view.fontSize = this.phoneNumberLabel.fontSize
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		
		view.opacity = {true: 1, false: 0}[!this.subdued]
	}
	
	positionEmailAddressLabel () {
		
		let view = this.emailAddressLabel
		let size = view.font.sizeOfString(view.text)
		let newFrame = new CGRect()
					
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.phoneNumberLabel.left + (this.phoneNumberLabel.width - newFrame.size.width)/2
		newFrame.origin.y = this.phoneNumberLabel.bottom + this.parameters.topBufferForEmailAddressLabel
		
					
		view.frame = newFrame
		
	}
	
	
	
	
	
	
	// Bio Paragraph
	configureBioParagraph () {
		let view = this.bioParagraph
		
		view.title = 'PRESENTATION'
		view.text = 'Under mer ' + lowerCaseADots + 'n 30 ' + lowerCaseARing + 'r har ' + upperCaseARing + 'ke Larsson arbetat som frilansande musiker och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sare.<br>Genom att kombinera sitt intresse f' + lowerCaseODots + 'r historia, religion och kultur kan han skapa program och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar som reflekterar kring m' + lowerCaseADots + 'nniskans villkor och hennes historiska f' + lowerCaseODots + 'ruts' + lowerCaseADots + 'ttningar.<br>I sitt musicerande kombinerar han ofta texter, betraktelser och musik kring ett utvalt tema.<br>I sina f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar ' + lowerCaseADots + 'r det ett gr' + lowerCaseADots + 'ns' + lowerCaseODots + 'verskridande reflekterande som ' + lowerCaseADots + 'r hans k' + lowerCaseADots + 'nnetecken.<br><br>Genom sina studier i musikvetenskap, religionsvetenskap och id' + lowerCaseEAcute + 'historia har ' + upperCaseARing + 'ke skaffat sig en solid grund att bygga vidare p' + lowerCaseARing + ', och g' + lowerCaseODots + 'r han oavl' + lowerCaseARing + 'tligen.<br><br>' + upperCaseADots + 'nda sedan barndomen har han fascinerats och tilltalats av olika s' + lowerCaseADots + 'tt att uttrycka sig genom musik, ber' + lowerCaseADots + 'ttande och skrivande.<br>Genom studier, resor, musikaliska m' + lowerCaseODots + 'ten och mycket l' + lowerCaseADots + 'sande har med tiden ' + upperCaseARing + 'kes framtr' + lowerCaseADots + 'danden allt mer kommit att pr' + lowerCaseADots + 'glas av en kombination av allt detta.<br><br>P' + lowerCaseARing + ' s' + lowerCaseARing + ' s' + lowerCaseADots + 'tt ' + lowerCaseADots + 'r hans artisteri och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sande grundat i samma intresse och samma fascination.'
		
		view.textIndent = 40
		view.opacity = {true: 1, false: 0}[!this.subdued]
		
		view.updateAllUI()
	}
	
	positionBioParagraph () {
		let view = this.bioParagraph
		let newFrame = new CGRect()
					
		newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioParagraph
		newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width)

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = this.profilePicture.top
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.emailAddressLabel.bottom + 50
		}
		
		
		view.frame = newFrame
	}
	
	
	// Missions Paragraph
	configureMissionsParagraph () {
		let view = this.missionsParagraph
		
		// view.title = 'UPPDRAG'
		// view.text = '&bull; Jag ' + lowerCaseADots + 'r ' + lowerCaseODots + 'ppen f' + lowerCaseODots + 'r att anpassa f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar och workshops som anknyter till de omr' + lowerCaseARing + 'den som n' + lowerCaseADots + 'mns h' + lowerCaseADots + 'r nedan.<br><br>&bull; I mina musikprogram  kombinerar jag musik, tonastta dikter, l' + lowerCaseADots + 'sta texter, betraktelser och ber' + lowerCaseADots + 'ttande. B' + lowerCaseARing + 'de musik och texter ' + lowerCaseADots + 'r h' + lowerCaseADots + 'mtade fr' + lowerCaseARing + 'n de europeiska och amerikanska traditionerna.<br><br>&bull; F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar som anknyter till historia, musikhistoria, kultur, religion och modernitet m.m.<br><br>&bull; Personal och styrelseutbildning f' + lowerCaseODots + 'r folkh' + lowerCaseODots + 'gskolor<br><br>&bull; Projektledare<br><br>&bull; Workshops om "Community Organizing"<br><br>&bull; Aktuella f' + lowerCaseODots + 'rel.<br><br>&bull; Religion och medernitet<br><br>&bull; Framv' + lowerCaseADots + 'xter av det moderna Sverige och den svenska sj' + lowerCaseADots + 'lvbilden.'
		
		// view.textAlign = 'center'
		view.opacity = {true: 1, false: 0}[!this.subdued]
		
		view.updateAllUI()
	}
	
	positionMissionsParagraph () {
		let view = this.missionsParagraph
		let newFrame = new CGRect()
					
		newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioParagraph
		newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width)

		newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2
		newFrame.origin.y = this.bioParagraph.bottom + this.parameters.topBufferForMissionsParagraph
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			newFrame.origin.x = (this.width - newFrame.size.width)/2
		}
		
		
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		// var aboutPage = this
		
		// $(this.selector).bind('mousewheel', function(evt) {
			
		// 	if (!aboutPage.scrollable) {
		// 		evt.preventDefault()
		// 	}
			
		// 	clearTimeout(aboutPage.scrollFinishTimer)
		// 	if (aboutPage.scrollTop <= 0) {
		// 		aboutPage.scrollFinishTimer = setTimeout(function () {
		// 			aboutPage.state.readyToClose = true
		// 		}, 50)
		// 	} else {
		// 		aboutPage.state.readyToClose = false
		// 	}
			
		// 	if (aboutPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
		// 		evt.preventDefault()
		// 	}
		// })
	}
	
	
	//
	// Actions
	//
	requiredHeightForWidth (width) { return this.footer.bottom }
	
	
	//
	// Delegate
	//
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
}