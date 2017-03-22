'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactPage = function (_JABView) {
	_inherits(ContactPage, _JABView);

	function ContactPage(customId) {
		_classCallCheck(this, ContactPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ContactPage).call(this, customId));

		_this.state = {
			readyToClose: true
		};
		_this.subdued = false;

		_this.scrollable = false;

		// Parameters

		_this.parameters = {
			reservedTopBuffer: 0,

			fractionOfAvailableContentWidthForBioParagraph: 5.0 / 7.0,
			bufferBetweenBioParagraphAndProfilePicture: 50,
			rightBufferForProfilePicture: 100,
			topBufferForProfilePicture: 30,
			sizeOfProfilePicture: 250,

			topBufferForPhoneNumberLabel: 30,
			topBufferForEmailAddressLabel: 10,

			leftBufferForBioParagraph: 200,
			topBufferForBioParagraph: 10,

			topBufferForMissionsParagraph: 70,

			profilePictureAspectRatio: 1.0 / 1.0
		};

		_this.bottomBufferForEmailAddress = 60;

		// UI
		_this.scrollBuffer = new JABView('ScrollBuffer');

		_this.profilePicture = new JABImageView('ProfilePicture');
		_this.bioParagraph = new TitledParagraph('BioParagraph');
		_this.missionsParagraph = new TitledParagraph('MissionsParagraph');

		_this.line = new JABView("Line");
		_this.phoneNumberLabel = new UILabel('PhoneNumberLabel');
		_this.emailAddressLabel = new UILabel('EmailAddressLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(ContactPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ContactPage.prototype), 'init', this).call(this);

			this.startEventListeners();
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addScrollBuffer();

			this.addProfilePicture();
			this.addBioParagraph();
			this.addMissionsParagraph();

			this.addLine();
			this.addPhoneNumberLabel();
			this.addEmailAddressLabel();
		}
	}, {
		key: 'addScrollBuffer',
		value: function addScrollBuffer() {
			this.addSubview(this.scrollBuffer);
		}
	}, {
		key: 'addProfilePicture',
		value: function addProfilePicture() {
			this.addSubview(this.profilePicture);
		}
	}, {
		key: 'addBioParagraph',
		value: function addBioParagraph() {
			this.addSubview(this.bioParagraph);
		}
	}, {
		key: 'addMissionsParagraph',
		value: function addMissionsParagraph() {
			this.addSubview(this.missionsParagraph);
		}
	}, {
		key: 'addLine',
		value: function addLine() {
			this.addSubview(this.line);
		}
	}, {
		key: 'addPhoneNumberLabel',
		value: function addPhoneNumberLabel() {
			this.addSubview(this.phoneNumberLabel);
		}
	}, {
		key: 'addEmailAddressLabel',
		value: function addEmailAddressLabel() {
			this.addSubview(this.emailAddressLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ContactPage.prototype), 'updateAllUI', this).call(this);

			this.updateParameters();

			this.configureScrollBuffer();
			this.positionScrollBuffer();

			this.configureProfilePicture();
			this.positionProfilePicture();

			this.configurePhoneNumberLabel();
			this.positionPhoneNumberLabel();

			this.configureEmailAddressLabel();
			this.positionEmailAddressLabel();

			this.configureLine();
			this.positionLine();

			this.configureBioParagraph();
			this.positionBioParagraph();

			this.configureMissionsParagraph();
			this.positionMissionsParagraph();
		}

		// Parameters

	}, {
		key: 'updateParameters',
		value: function updateParameters() {

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				this.parameters.fractionOfAvailableContentWidthForBioTextLabel = 6.0 / 7.0;
			} else {
				this.parameters.fractionOfAvailableContentWidthForBioTextLabel = 5.0 / 7.0;
			}
		}

		// Scroll Buffer

	}, {
		key: 'configureScrollBuffer',
		value: function configureScrollBuffer() {

			var view = this.scrollBuffer;

			view.backgroundColor = this.backgroundColor;
		}
	}, {
		key: 'positionScrollBuffer',
		value: function positionScrollBuffer() {
			var view = this.scrollBuffer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = this.height + 50;

			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				newFrame.size.height = this.emailAddressLabel.bottom + 50;
			}

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Profile Picture

	}, {
		key: 'configureProfilePicture',
		value: function configureProfilePicture() {
			var view = this.profilePicture;

			view.src = resourcesDirectory + '/Images/Contact Page/Profile Picture.jpg';
		}
	}, {
		key: 'positionProfilePicture',
		value: function positionProfilePicture() {

			var view = this.profilePicture;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * (1 - this.parameters.fractionOfAvailableContentWidthForBioParagraph);
			newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio;

			newFrame.origin.x = this.width - newFrame.size.width - (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForProfilePicture;

			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				newFrame.size.width = applicationRoot.contentWidth * 0.5;
				newFrame.size.height = newFrame.size.width * this.parameters.profilePictureAspectRatio;

				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			}

			view.frame = newFrame;
		}

		//Line

	}, {
		key: 'configureLine',
		value: function configureLine() {
			var view = this.line;
			view.backgroundColor = 'white';
			view.opacity = { true: 1, false: 0 }[!this.subdued];
		}
	}, {
		key: 'positionLine',
		value: function positionLine() {
			var newFrame = new CGRect();

			newFrame.size.width = 60;
			newFrame.size.height = 1;

			newFrame.origin.x = this.emailAddressLabel.x;
			newFrame.origin.y = this.emailAddressLabel.y - newFrame.size.height - 25;

			this.line.frame = newFrame;
		}

		// Phone Number Label

	}, {
		key: 'configurePhoneNumberLabel',
		value: function configurePhoneNumberLabel() {
			var view = this.phoneNumberLabel;
			view.text = "telefon &nbsp;:: &nbsp;<span id='phoneNumber---" + this.id + "' style='color:black; cursor: pointer'>070-683-5708</span>";

			view.textColor = '#999999';
			view.fontSize = { 'xxs': 16, 'xs': 20, 's': 13, 'm': 13, 'l': 13, 'xl': 13 }[sizeClass];
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';

			view.opacity = { true: 1, false: 0 }[!this.subdued];
		}
	}, {
		key: 'positionPhoneNumberLabel',
		value: function positionPhoneNumberLabel() {
			var view = this.phoneNumberLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.profilePicture.left + (this.profilePicture.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.profilePicture.bottom + this.parameters.topBufferForPhoneNumberLabel;

			view.frame = newFrame;
		}

		// Email Address Label

	}, {
		key: 'configureEmailAddressLabel',
		value: function configureEmailAddressLabel() {
			var view = this.emailAddressLabel;
			view.text = "mejl &nbsp;:: &nbsp;<span id='emailAddress---" + this.id + "' style='color:black; cursor: pointer'>al.kult.utb@gmail.com</span>";

			view.textColor = '#999999';
			view.fontSize = this.phoneNumberLabel.fontSize;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';

			view.opacity = { true: 1, false: 0 }[!this.subdued];
		}
	}, {
		key: 'positionEmailAddressLabel',
		value: function positionEmailAddressLabel() {

			var view = this.emailAddressLabel;
			var size = view.font.sizeOfString(view.text);
			var newFrame = new CGRect();

			newFrame.size.width = size.width;
			newFrame.size.height = size.height;

			newFrame.origin.x = this.phoneNumberLabel.left + (this.phoneNumberLabel.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.phoneNumberLabel.bottom + this.parameters.topBufferForEmailAddressLabel;

			view.frame = newFrame;
		}

		// Bio Paragraph

	}, {
		key: 'configureBioParagraph',
		value: function configureBioParagraph() {
			var view = this.bioParagraph;

			console.log("Ã");
			view.title = 'PRESENTATION';
			view.text = 'Under mer ' + lowerCaseADots + 'n 30 ' + lowerCaseARing + 'r har ' + upperCaseARing + 'ke Larsson arbetat som frilansande musiker och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sare.<br>Genom att kombinera sitt intresse f' + lowerCaseODots + 'r historia, religion och kultur kan han skapa program och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar som reflekterar kring m' + lowerCaseADots + 'nniskans villkor och hennes historiska f' + lowerCaseODots + 'ruts' + lowerCaseADots + 'ttningar.<br>I sitt musicerande kombinerar han ofta texter, betraktelser och musik kring ett utvalt tema.<br>I sina f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar ' + lowerCaseADots + 'r det ett gr' + lowerCaseADots + 'ns' + lowerCaseODots + 'verskridande reflekterande som ' + lowerCaseADots + 'r hans k' + lowerCaseADots + 'nnetecken.<br><br>Genom sina studier i musikvetenskap, religionsvetenskap och id' + lowerCaseEAcute + 'historia har ' + upperCaseARing + 'ke skaffat sig en solid grund att bygga vidare p' + lowerCaseARing + ', och g' + lowerCaseODots + 'r han oavl' + lowerCaseARing + 'tligen.<br><br>' + upperCaseADots + 'nda sedan barndomen har han fascinerats och tilltalats av olika s' + lowerCaseADots + 'tt att uttrycka sig genom musik, ber' + lowerCaseADots + 'ttande och skrivande.<br>Genom studier, resor, musikaliska m' + lowerCaseODots + 'ten och mycket l' + lowerCaseADots + 'sande har med tiden ' + upperCaseARing + 'kes framtr' + lowerCaseADots + 'danden allt mer kommit att pr' + lowerCaseADots + 'glas av en kombination av allt detta.<br><br>P' + lowerCaseARing + ' s' + lowerCaseARing + ' s' + lowerCaseADots + 'tt ' + lowerCaseADots + 'r hans artisteri och f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sande grundat i samma intresse och samma fascination.';

			view.textIndent = 40;
			view.opacity = { true: 1, false: 0 }[!this.subdued];

			view.updateAllUI();
		}
	}, {
		key: 'positionBioParagraph',
		value: function positionBioParagraph() {
			var view = this.bioParagraph;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioParagraph;
			newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width);

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = this.profilePicture.top;

			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = this.emailAddressLabel.bottom + 50;
			}

			view.frame = newFrame;
		}

		// Missions Paragraph

	}, {
		key: 'configureMissionsParagraph',
		value: function configureMissionsParagraph() {
			var view = this.missionsParagraph;

			// view.title = 'UPPDRAG'
			// view.text = '&bull; Jag ' + lowerCaseADots + 'r ' + lowerCaseODots + 'ppen f' + lowerCaseODots + 'r att anpassa f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar och workshops som anknyter till de omr' + lowerCaseARing + 'den som n' + lowerCaseADots + 'mns h' + lowerCaseADots + 'r nedan.<br><br>&bull; I mina musikprogram  kombinerar jag musik, tonastta dikter, l' + lowerCaseADots + 'sta texter, betraktelser och ber' + lowerCaseADots + 'ttande. B' + lowerCaseARing + 'de musik och texter ' + lowerCaseADots + 'r h' + lowerCaseADots + 'mtade fr' + lowerCaseARing + 'n de europeiska och amerikanska traditionerna.<br><br>&bull; F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningar som anknyter till historia, musikhistoria, kultur, religion och modernitet m.m.<br><br>&bull; Personal och styrelseutbildning f' + lowerCaseODots + 'r folkh' + lowerCaseODots + 'gskolor<br><br>&bull; Projektledare<br><br>&bull; Workshops om "Community Organizing"<br><br>&bull; Aktuella f' + lowerCaseODots + 'rel.<br><br>&bull; Religion och medernitet<br><br>&bull; Framv' + lowerCaseADots + 'xter av det moderna Sverige och den svenska sj' + lowerCaseADots + 'lvbilden.'

			// view.textAlign = 'center'
			view.opacity = { true: 1, false: 0 }[!this.subdued];

			view.updateAllUI();
		}
	}, {
		key: 'positionMissionsParagraph',
		value: function positionMissionsParagraph() {
			var view = this.missionsParagraph;
			var newFrame = new CGRect();

			newFrame.size.width = (applicationRoot.contentWidth - this.parameters.bufferBetweenBioParagraphAndProfilePicture) * this.parameters.fractionOfAvailableContentWidthForBioParagraph;
			newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width);

			newFrame.origin.x = (this.width - applicationRoot.contentWidth) / 2;
			newFrame.origin.y = this.bioParagraph.bottom + this.parameters.topBufferForMissionsParagraph;

			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			}

			view.frame = newFrame;
		}

		//
		// Event Listeners
		//

	}, {
		key: 'startEventListeners',
		value: function startEventListeners() {}
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


		//
		// Actions
		//

	}, {
		key: 'requiredHeightForWidth',
		value: function requiredHeightForWidth(width) {
			return this.footer.bottom;
		}

		//
		// Delegate
		//

		// Image View

	}, {
		key: 'imageViewDidFinishLoadingImage',
		value: function imageViewDidFinishLoadingImage(imageView) {}
	}]);

	return ContactPage;
}(JABView);