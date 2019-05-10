import * as React from 'react';

type Props = {
    id: string;
    value: string;
    onChange: (id: string, value:string) => void;
}

type State = {
    Counter: number;
}

export default class DemoComponent extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {Counter: 0};
        this.handleChange = this.handleChange.bind(this);
        this.updateCounter = this.updateCounter.bind(this);
    }

    render() {
        return (
            <div>
                <h2>This is a heading.</h2>
                <p>This is a paragraph.</p>
                <input type='text' value={this.props.value} onChange={this.handleChange}  />
                <button value="+" onClick={this.updateCounter}>+</button>
                <button value="-" onClick={this.updateCounter}>-</button>
            </div>
        );
    }
    
    componentWillReceiveProps(np: Props) {
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