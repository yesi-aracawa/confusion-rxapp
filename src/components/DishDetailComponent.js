import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
	if (dish != null)
		return (
			<Card>
				<CardImg top src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	else return <div></div>;
}

function RenderComments({ comments }) {
	const comnts = comments.map((comment) => {
		return (
			<div key={comment.id}>
				<ul className="list-unstyled">
					<li>
						<p>{comment.comment}</p>
						<p>
							--author: {comment.author},{' '}
							{new Intl.DateTimeFormat('en-Us', {
								year: 'numeric',
								month: 'short',
								day: '2-digit',
							}).format(new Date(Date.parse(comment.date)))}
						</p>
					</li>
				</ul>
			</div>
		);
	});
	if (comments != null)
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				{comnts}
			</div>
		);
	else return <div>Estoy solo :c</div>;
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<RenderComments comments={props.dish.comments} />
				</div>
			</div>
		);
	} else return <div></div>;
};

export default DishDetail;
