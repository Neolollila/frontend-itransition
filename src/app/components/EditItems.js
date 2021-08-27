import React, {Component} from "react";
import AppNavbar from "./AppNavbar";
import {Alert, Form, FormGroup, Input, Label} from "reactstrap";
import BackendService from "../services/BackendService";
import {withTranslation} from "react-i18next";


class EditItems extends Component{

    constructor(props) {
        super(props);

        this.state={
            name: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getItemById(this.props.match.params.idItem)
            .then( response => {
                this.setState({
                    name: response.data.name
                });
            }, error => {
                    console.log(error);
                    this.setState({
                        error: error.toString()
                    });
                }
            )
    }

    handleSubmit(event) {
        event.preventDefault();

        BackendService.editItem(this.props.match.params.idItem, {
            name: this.state.name,

        })
            .then(response => {

                this.props.history.push(`/editCollection/${this.props.match.params.id}/tableItem`);
            })
            .catch(err=>{

            });


    }



    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <div>
                    <div>
                        <Alert color="primary">
                            {t("Edit_item")}!
                        </Alert>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleName">{t("Item_name")}</Label>
                                <Input onChange={this.handleChange} value={this.state.name}
                                       type="text" name="name" id="exampleName"  />
                            </FormGroup>


                            <p><button type="submit" className="btn btn-primary">{t("Save_changes")}</button></p>

                        </Form>

                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation() (EditItems)