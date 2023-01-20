import { h, Component } from 'preact';
import I18n from 'i18n-js';
<<<<<<< HEAD
import { connect } from 'preact-redux';
=======
>>>>>>> feat(fbw): add new options and alert messages

import '../style';

import ProgressBar from '../../../../src/components/progressbar';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> feat(fbw): add new options and alert messages

class Setting extends Component {
	toggleForm(form) {
		return () => this.setState({ form });
	}

<<<<<<< HEAD
	checkHost () {
		this.runProgress('checking', 120, 3, () => clearInterval(this.progressInterval));
		this.fetchHost();
	}

	fetchHost () {
		setTimeout(() => {
			axios.get('http://thisnode.info/cgi-bin/hostname')
				.then(res => res.data.split('\n')[0])
				.then(res => {
					if (res === this.props.expectedHost) {
						this.setState({
							hostname: res,
							time: 0,
							action: 'finish'
						});
					}
					else {
						this.fetchHost();
						this.setState({
							notOnNetwork: true
						});
					}
				})
				.catch(err => {
					console.log(err);
					this.setState({
						notOnNetwork: false
					});
					this.fetchHost();
				});
		}, 3000);
	}

	runProgress (action, time, rate, cb) {
		this.setState({
			action,
			time
		});
		const addProgress = () => {
			if (this.state.time > 0) {
				this.setState({
					progress: this.state.progress + (100/time),
					time: --this.state.time
				});
			}
			else {
				clearInterval(this.progressInterval);
				this.setState({
					progress: 0,
					time: 0
				});
				cb();
			}
		};
		this.progressInterval = setInterval(addProgress, rate*1000);
	}

	reload () {
		window.location.href = 'http://thisnode.info/app';
=======
	runProgress () {
		const addProgress = () => {
			if (this.state.progress <= 99.96) {
				this.setState({
					progress: this.state.progress + 1.666666,
					time: this.state.time - 1
				});
			}
			else {
				clearInterval(progressInterval);
			}
		};
		const progressInterval = setInterval(addProgress, 1000);
>>>>>>> feat(fbw): add new options and alert messages
	}

	constructor(props){
		super(props);
<<<<<<< HEAD
		this.runProgress = this.runProgress.bind(this);
		this.fetchHost = this.fetchHost.bind(this);
		this.checkHost = this.checkHost.bind(this);

		this.state = {
			progress: 0,
			time: null,
			hostname: null,
			action: null
=======
		this.state = {
			progress: 0,
			time: 60
>>>>>>> feat(fbw): add new options and alert messages
		};
	}

	componentDidMount() {
<<<<<<< HEAD
		this.runProgress('setting', 60, 1, this.checkHost);
=======
		setTimeout(() => {
			const interval = setInterval(() => {

			}, 3000);
		}, 60000);
		this.runProgress();
>>>>>>> feat(fbw): add new options and alert messages
	}

	render (){
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
<<<<<<< HEAD
				{this.state.action === 'setting' && <h1>{I18n.t('Setting network')}</h1>}
				{this.state.action === 'checking' && <h1>{I18n.t('Checking connection')}</h1>}
				{this.state.action === 'finish' && <h1>{I18n.t('Congratulations')}</h1>}
				{!this.state.hostname && <ProgressBar progress={this.state.progress} />}
				{this.state.notOnNetwork && <p>{I18n.t('You are connected to another node in the network, try connecting to')} {this.props.expectedNetwork}/{this.props.expectedHost}</p>}
				{this.state.time > 0 && <div style={{ width: '100%' }}>
					<span style={{ margin: '0 auto', textAlign: 'center' }}>{I18n.t('Please wait')} {this.state.time} {I18n.t('seconds')}</span>
				</div>}
				{this.state.hostname && <div>
					<p>{I18n.t('You have successfuly connected to')} {this.state.hostname}</p>
					<p>{I18n.t('You are now part of ')} {this.props.expectedNetwork}</p>
					<button onClick={this.reload}>{I18n.t('Reload page')}</button>
				</div>}
=======
				<h1>{I18n.t('Setting network')}</h1>
				<ProgressBar progress={this.state.progress} />
				<div style={{ width: '100%' }}>
					<span style={{ margin: '0 auto', textAlign: 'center' }}>{I18n.t('Please wait')} {this.state.time} {I18n.t('seconds')}</span>
				</div>
>>>>>>> feat(fbw): add new options and alert messages
			</div>
		);
	}
}

<<<<<<< HEAD
const mapStateToProps = (state) => ({
	expectedHost: state.firstbootwizard.expectedHost,
	expectedNetwork: state.firstbootwizard.expectedNetwork
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
=======
export default Setting;
>>>>>>> feat(fbw): add new options and alert messages
