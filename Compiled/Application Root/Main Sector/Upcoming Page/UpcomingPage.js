'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpcomingPage = function (_JABView) {
	_inherits(UpcomingPage, _JABView);

	function UpcomingPage(customId) {
		_classCallCheck(this, UpcomingPage);

		// State

		// Parameters

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UpcomingPage).call(this, customId));

		_this.parameters = {
			reservedTopBuffer: 0,
			topBufferForParagraph: 70
		};

		// UI
		_this.paragraph = new TitledParagraph('Paragraph');

		return _this;
	}

	//
	// Init
	//

	_createClass(UpcomingPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(UpcomingPage.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addParagraph();
		}
	}, {
		key: 'addParagraph',
		value: function addParagraph() {
			this.addSubview(this.paragraph);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(UpcomingPage.prototype), 'updateAllUI', this).call(this);

			this.configureParagraph();
			this.positionParagraph();
		}

		// Paragraph

	}, {
		key: 'configureParagraph',
		value: function configureParagraph() {
			var view = this.paragraph;

			view.title = '';
			view.text = '&bull; F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sning f' + lowerCaseODots + 'r Teologiska h' + lowerCaseODots + 'gskolan. <b>"Framv' + lowerCaseADots + 'xten av det moderna Sverige och den svenska sj' + lowerCaseADots + 'lvbilden"</b>. F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sningen ' + lowerCaseADots + 'r en del av kursmomentet "Muslimer och muslimskt liv i Sverige". Kista folkh' + lowerCaseODots + 'gskola, Stockholm .<br><br>&bull; <b>"Migrants and Refugees as Rebuilders"</b>. Transnational meeting at the Social Science University. Ankara, Turkey<br><br>&bull; Premi' + lowerCaseADots + 'r f' + lowerCaseODots + 'r min nya f' + lowerCaseODots + 'rest' + lowerCaseADots + 'llning <b>"Innanf' + lowerCaseODots + 'r - utanf' + lowerCaseODots + 'r"</b> - Gitarrstycken, visor, texter och betraktelser om att vara i eller utanf' + lowerCaseODots + 'r... eller kanske mellan, en relation, en tillh' + lowerCaseODots + 'righet, sitt eget inre rum...<br><br>&bull; Samtalsledare under Sommarakademien p' + lowerCaseARing + ' Ljungskile folkh' + lowerCaseODots + 'gskola. ' + upperCaseARing + 'rets tema ' + lowerCaseADots + 'r "<b>Bildningens f' + lowerCaseODots + 'rvandlingar</b> - ' + upperCaseADots + 'ven hundra' + lowerCaseARing + 'riga ekar har vuxit fram ur sm' + lowerCaseARing + ' ekollon"';

			view.updateAllUI();
		}
	}, {
		key: 'positionParagraph',
		value: function positionParagraph() {
			var view = this.paragraph;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth * 0.7;
			if (sizeClass == 'xs' || sizeClass == 'xxs') {
				newFrame.size.width = applicationRoot.contentWidth;
			}
			newFrame.size.height = view.requiredHeightForWidth(newFrame.size.width);

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForParagraph;

			view.frame = newFrame;
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

	}]);

	return UpcomingPage;
}(JABView);