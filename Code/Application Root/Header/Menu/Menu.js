class Menu extends JABView {

	constructor (customId, items) {
		super(customId)

		// State
		this.items = items
		this.showUnderline = true
		this.underlinePositionDuration = 0
		this.selectedIndex = -1
		this.fadeUnselectedButtons = false

		this.requiredWidth = 400
		this.requiredHeight = 400
		
		
		this.textColor = null
		this.fontSize = null
		this.fontFamily = null
		this.fontWeight = null
		this.fontStyle = null
		this.fontVariant = null
		this.letterSpacing = null
		this.textAlign = null

		
		// UI
		this.buttons = []
		for (var i = 0; i < this.items.length; i++) {
			this.buttons.push(new UILabel())
		}
		this.underline = new JABView('Underline')

		
		// Parameters
		this.heightOfUnderline = 1
		this.topBufferForUnderline = 5
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
	}
	
	//
	// Getters and Setters
	//
	
	// Selected Index
	get selectedIndex () {
		return this._selectedIndex
	}
	
	set selectedIndex (newSelectedIndex) {
		
		var difference = Math.abs(this.selectedIndex - newSelectedIndex)
		this.underlinePositionDuration = lesserOfTwo(200 * difference, 400)
		
		this._selectedIndex = newSelectedIndex
	}


	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addButtons()
		this.addUnderline()
		
	}
	
	
	
	addButtons () {
		for (var i = 0; i < this.buttons.length; i++) {
			this.addSubview(this.buttons[i])
		}
	}
	
	addUnderline () {
		this.addSubview(this.underline)
	}
	



	
	// Update
	updateAllUI () {
		super.updateAllUI()


		this.configureButtons()
		this.positionButtons()


		this.configureUnderline()
		this.positionUnderline()

	}




	configureButtons () {

		for (var i = 0; i < this.buttons.length; i++) {
			let view = this.buttons[i]
			view.clickable = true

			view.text = this.items[i].displayTitle
			view.textColor = this.textColor
			view.fontSize = this.fontSize
			view.fontFamily = this.fontFamily
			view.fontWeight = this.fontWeight
			view.fontStyle = this.fontStyle
			view.fontVariant = this.fontVariant
			view.letterSpacing = this.letterSpacing
			
			view.textAlign = this.textAlign
			
			view.widthIsAuto = true
			view.heightIsAuto = true
			
			if (this.fadeUnselectedButtons) {
				if (i != this.selectedIndex) {
					view.opacity = 0.6
				} else {
					view.opacity = 1
				}
			}
			
			view.cursor = 'pointer'
		}
	}

	positionButtons () {

		var tallestHeight = 0
		var betweenBufferForButtons = 40

		for (var i = 0; i < this.buttons.length; i++) {
			let view = this.buttons[i]
			var newFrame = new CGRect()

			if (view.height > tallestHeight) { tallestHeight = view.height }
			
			if (i == 0) {
				newFrame.origin.x = 0
			} else {
				newFrame.origin.x = this.buttons[i - 1].right + betweenBufferForButtons
			}

			newFrame.origin.y = 0

			view.frame = newFrame
		}

		this.requiredWidth = this.buttons[i - 1].right
		this.requiredHeight = tallestHeight + this.topBufferForUnderline + this.heightOfUnderline
	}




	configureUnderline () {

		this.underline.backgroundColor = this.textColor
		this.underline.positionDuration = this.underlinePositionDuration

		if (this.showUnderline) {
			this.underline.opacity = 1
		} else {
			this.underline.opacity = 0
		}

	}

	positionUnderline () {
		
		var positionIndex = this.selectedIndex
		if (positionIndex == -1) {
			positionIndex = 0
		}
		var underlinedButton = this.buttons[positionIndex]

		var newFrame = new CGRect()
		
		newFrame.size.width = underlinedButton.width - 2
		newFrame.size.height = this.heightOfUnderline

		newFrame.origin.x = underlinedButton.x + (underlinedButton.width - newFrame.size.width)/2 - 1
		newFrame.origin.y = underlinedButton.bottom + this.topBufferForUnderline

		this.underline.frame = newFrame

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
	viewWasClicked (view) {
		
		for (var i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i] == view) {
				if (this.items.length > i) {
					this.parent.menuItemWasSelected(this.items[i])
				}
			}
		}
	}

}
