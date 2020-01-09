import * as React from 'react';

export interface IProps {
    id: string;
    value: string;
    onChange: (id: string, value:string) => void;
}

export interface IState {
    Counter: number;
}

export class DemoComponent extends React.Component<IProps, IState> {
    constructor(props: Readonly<IProps>) {
        super(props);
        this.state = { Counter: 0 };
        this.handleChange = this.handleChange.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
    }

    render() {
        return (
            <div>
                <h2>This is a heading.</h2>
                <p>This is a paragraph.</p>
                <input type='text' value={this.props.value} onChange={this.handleChange}  />
                <button type="button" value="+" onClick={this.updateCounter}>+</button>
                <button type="button" value="-" onClick={this.updateCounter}>-</button>
            </div>
        );
    }
    
    componentWillReceiveProps(np: IProps) {
        this.setState({Counter : parseInt(np.value)});
    }
    
    updateCounter(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({Counter: this.state.Counter + (e.currentTarget.value === "+" ? 1 : -1)},
        () => {
            this.props.onChange(this.props.id, this.state.Counter.toString()); 
        });
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const text = e.currentTarget.value;
        this.props.onChange(this.props.id, text);
    }
}