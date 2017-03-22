class TitledParagraph extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.title = ''
		this.text = ''
		this.textIndent = 0
		this.textAlign = 'left'
		this.requiredHeight = 0
		
		// Parameters
		this.parameters = {
			topBufferForTextLabel: 10,
		}
		
		// UI
		this.titleLabel = new UILabel('TitleLabel')
		this.textLabel = new UILabel('TextLabel')
		
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
		
		this.addTitleLabel()
		this.addTextLabel()
		
	}
	
	
	addTitleLabel () {
		this.addSubview(this.titleLabel)
	}
	
	addTextLabel () {
		this.addSubview(this.textLabel)
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureTitleLabel()
		this.positionTitleLabel()
		
		this.configureTextLabel()
		this.positionTextLabel()
	}
	
	
	
	
	// Title Label
	configureTitleLabel () {
		let view = this.titleLabel
		
		if (view.text == '') { view.text = this.title }
		
		view.textColor = 'black'
		view.fontSize = 18
		view.fontFamily = 'siteFont'
		view.fontWeight = 'bold'
	}
	
	positionTitleLabel () {
		let view = this.titleLabel
		let newFrame = new CGRect()
		let size = view.font.sizeOfString(view.text)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	
	// Text Label
	configureTextLabel () {
		let view = this.textLabel
		
		if (view.text == '') { view.text = this.text }
		
		view.textColor = '#999999'
		view.fontSize = {'xxs': 13, 'xs': 20, 's': 14, 'm': 14, 'l': 14, 'xl': 14}[sizeClass]
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		view.lineHeight = {'xxs': 1.5, 'xs': 1.8, 's': 1.7, 'm': 1.7, 'l': 1.7, 'xl': 1.7}[sizeClass]
		view.textIndent = this.textIndent
		
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			view.textAlign = 'justify'
			view.textJustify = 'inter-word'
		} else {
			view.textAlign = this.textAlign
			view.textJustify = 'auto'
		}
	}
	
	positionTextLabel () {
		let view = this.textLabel
		let newFrame = new CGRect()
					
		newFrame.size.width = this.width
		let size = view.font.sizeOfString(view.text, newFrame.size.width)
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.titleLabel.bottom + this.parameters.topBufferForTextLabel
		
		view.frame = newFrame
		this.requiredHeight = view.bottom
	}
	
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	requiredHeightForWidth (width) {
		let size = this.textLabel.font.sizeOfString(this.textLabel.text, width)
		return (this.titleLabel.height + this.parameters.topBufferForTextLabel + size.height)
	}
	
	//
	// Delegate
	//
	
}