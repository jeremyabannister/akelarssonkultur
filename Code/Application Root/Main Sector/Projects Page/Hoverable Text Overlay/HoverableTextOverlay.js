class HoverableTextOverlay extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.hovered = false
		this.text = ''
		
		// Parameters
		this.parameters = {
			fractionOfWidthForLabel: 0.7,
			rightBufferForLabel: 20,
			topBufferForLabel: 20,
		}
		
		// UI
		this.dimmer = new JABView('Dimmer')
		this.label = new UILabel('Label')
		
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
		
		this.addDimmer()
		this.addLabel()
		
	}
	
	
	addDimmer () {
		this.addSubview(this.dimmer)
	}
	
	addLabel () {
		this.addSubview(this.label)
	}
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureDimmer()
		this.positionDimmer()
		
		this.positionLabel()
		this.configureLabel()
	}
	
	
	
	
	// Dimmer
	configureDimmer () {
		let view = this.dimmer
		view.hoverable = true
		view.backgroundColor = 'black'
		view.opacity = {true: 0.3, false: 0}[this.hovered]
	}
	
	positionDimmer () {
		let view = this.dimmer
		let newFrame = this.bounds
		view.frame = newFrame
	}
	
		
	// Label
	configureLabel () {
		let view = this.label
		
		if (view.text == '') { view.text = this.text }
		
		view.textColor = 'white'
		view.fontSize = 16
		view.fontFamily = 'siteFont'
		view.textAlign = 'right'
		
		view.opacity = {true: 1, false: 0}[this.hovered]
	}
	
	positionLabel () {
		let view = this.label
		let newFrame = new CGRect()
		let size = view.font.sizeOfString(view.text, this.width * this.parameters.fractionOfWidthForLabel)
							
		newFrame.size.width = size.width
		newFrame.size.height = size.height

		newFrame.origin.x = this.width - newFrame.size.width - this.parameters.rightBufferForLabel
		newFrame.origin.y = this.parameters.topBufferForLabel
							
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
	
	// JABView
	viewWasHovered (view) {
		this.hovered = true
		this.animatedUpdate()
	}
	
	viewWasUnhovered (view) {
		this.hovered = false
		this.animatedUpdate()
	}
	
}