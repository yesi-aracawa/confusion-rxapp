import React, { Component } from 'react';
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	Label,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleCommentForm = this.handleCommentForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	handleCommentForm(event) {
		this.toggleModal();
		event.preventDefault();
	}
	render() {
		return (
			<div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody onSubmit={this.handleCommentForm}>
						<LocalForm onSubmit={this.handleSubmit} className="justify-content-center">
							<Label htmlFor="rating">Rating</Label>
							<Row className="form-group">
								<Col>
									<Control.select model=".rating" id="rating" name="rating" className="form-control">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>
							<Label htmlFor="author">Your Name</Label>
							<Row className="form-group">
								<Col>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: 'Required ',
											minLength: 'Your Name must be greater than 2 characters',
											maxLength: 'Your Name must be 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Label htmlFor="comment">Comment</Label>
							<Row className="form-group">
								<Col>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col>
									<Button type="submit" color="primary">
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModal} color="secondary">
					<BsPencil /> Submit Comment
				</Button>
			</div>
		);
	}
}

function RenderDish({ dish }) {
	if (dish != null)
		return (
			<FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
		);
	else return <div></div>;
}

function RenderComments({comments, postComment, dishId}) {
	const comnts = comments.map((comment) => {
		return (
			<div key={comment.id}>
				<ul className="list-unstyled">
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in>
                <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                </li>
              </Fade>
            );
          })}
        </Stagger>
				</ul>
			</div>
		);
	});
	if (comments != null)
		return (
			<div>
				<h4>Comments</h4>
				{comnts}
				<CommentForm dishId={dishId} postComment={postComment} />
			</div>
		);
	else return <div>Estoy solo :c</div>;
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				</div>
			</div>
		);
	} else return <div></div>;
};

export default DishDetail;
