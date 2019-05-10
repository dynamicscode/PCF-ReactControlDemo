import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import { render } from "react-dom";
import DemoComponent from "./DemoComponent";

type CompProps = {
};
type CompState = {	
};

export class ReactControlDemo extends React.Component<CompProps> implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _value: string;
	private _notifyOutputChanged:() => void;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;

	constructor(props:CompProps) {
		super(props);

		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleFieldChange(id:string, value: string) {
		this._value = value;
		this._notifyOutputChanged();
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, 
		notifyOutputChanged: () => void, 
		state: ComponentFramework.Dictionary, 
		container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;

		// creating HTML elements for the input type range and binding it to the function which refreshes the control data
		// appending the HTML elements to the control's HTML container element.
		container.appendChild(this._container);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		// storing the latest context from the control.
		this._context = context;
		this._value = context.parameters.value.raw;
		render(<DemoComponent id="control1" value={this._value} onChange={this.handleFieldChange} />, this._container);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			value : this._value
		};
			
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		
	}
}