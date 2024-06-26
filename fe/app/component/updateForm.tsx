import * as React from 'react';

interface UpdateFormProps {
    initialData?: {
        name: string;
        email: string;
    };
    onSubmit: (data: { name: string; email: string }) => void;
}

interface UpdateFormState {
    name: string;
    email: string;
}

class UpdateForm extends React.Component<UpdateFormProps, UpdateFormState> {
    state: UpdateFormState = {
        name: this.props.initialData?.name || '',
        email: this.props.initialData?.email || '',
    };

    private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: e.target.value });
    }

    private handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value });
    }

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="Email"
                />
                <button type="submit">Update</button>
            </form>
        );
    }
}

export default UpdateForm;