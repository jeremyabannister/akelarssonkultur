class UpcomingPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			
			widthOfPhoto: 400,
			heightToWidthAspectRatioOfPhoto: (1224.0/1632.0),
			topBufferForPhoto: 30,
			
			topBufferForParagraph: 70,
		}
		
		// UI
		this.photo = new JABView('Photo')
		this.paragraph = new TitledParagraph('Paragraph')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addPhoto()
		this.addParagraph()
		
	}
	
	
	
	addPhoto () {
		this.addSubview(this.photo)
	}
	
	addParagraph () {
		this.addSubview(this.paragraph)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configurePhoto()
		this.positionPhoto()
		
		this.configureParagraph()
		this.positionParagraph()
	}
	
	
	
	
	
	
	// Photo
	configurePhoto () {
		let view = this.photo
		
		view.backgroundImage = resourcesDirectory + '/Images/Upcoming Page/Photo.jpg'
	}
	
	positionPhoto () {
		let view = this.photo
		let newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.widthOfPhoto
		newFrame.size.height = newFrame.size.width * this.parameters.heightToWidthAspectRatioOfPhoto

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForPhoto
							
		view.frame = newFrame
	}
	
	
	// Paragraph
	configureParagraph () {
		let view = this.paragraph
		
		view.title = ''
		view.text = '&bull; F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sning f' + lowerCaseODots + 'r Teologiska h' + lowerCaseODots + 'gskolan. <b>"Framv' + lowerCaseADots + 'xten av det moderna Sverige och den svenska sj' + lowerCaseADots + 'lvbilden"</b>. F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningen ' + lowerCaseADots + 'r en del av kursmomentet "Muslimer och muslimskt liv i Sverige". Kista folkh' + lowerCaseODots + 'gskola, Stockholm .<br><br>&bull; <b>"Migrants and Refugees as Rebuilders"</b>. Transnational meeting at the Social Science University. Ankara, Turkey<br><br>&bull; Premi' + lowerCaseADots + 'r f' + lowerCaseODots + 'r min nya f' + lowerCaseODots + 'rest' + lowerCaseADots + 'llning <b>"Innanf' + lowerCaseODots + 'r - utanf' + lowerCaseODots + 'r"</b> - Gitarrstycken, visor, texter och betraktelser om att vara i eller utanf' + lowerCaseODots + 'r... eller kanske mellan, en relation, en tillh' + lowerCaseODots + 'righet, sitt eget inre rum...<br><br>&bull; Samtalsledare under Sommarakademien p' + lowerCaseARing + ' Ljungskile folkh' + lowerCaseODots + 'gskola. ' + upperCaseARing + 'rets tema ' + lowerCaseADots + 'r "<b>Bildningens f' + lowerCaseODots + 'rvandlingar</b> - ' + upperCaseADots + 'ven hundra' + lowerCaseARing + 'riga ekar har vuxit fram ur sm' + lowerCaseARing + ' ekollon"'
		
		view.updateAllUI()
	}
	
	positionParagraph () {
		let view = this.paragraph
		let newFrame = new CGRect()
					
		newFrame.size.width = (applicationRoot.contentWidth * 0.7)
		if (sizeClass == 'xs' || sizeClass == 'xxs') { newFrame.size.width = applicationRoot.contentWidth * 0.8 }
		newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width)

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.photo.bottom + this.parameters.topBufferForParagraph
		
		
		view.frame = newFrame
	}
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
}