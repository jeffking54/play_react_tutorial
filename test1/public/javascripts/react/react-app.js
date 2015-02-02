// tutorial1.js
// tutorial2.js
// tutorial5.js
var converter = new Showdown.converter();

var Comment = React.createClass({
        render: function() {
            var rawMarkup = converter.makeHtml(this.props.children.toString());
            return (
                <div className="comment">
            <h2 className="commentAuthor">
            {this.props.author}
        </h2>
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>
);
}
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.id}>
                    {comment.name}
                </Comment>
        );
        });
        return (
            <div className="commentList">
            {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(e) {
    e.preventDefault();
    var text = this.refs.name.getDOMNode().value.trim();

    this.props.onCommentSubmit({name: text});
    this.refs.name.getDOMNode().value = '';
    return;
},
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Say something..." ref="name" />
            <input type="submit" value="Post" />
        </form>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },

    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="commentBox">
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />

        </div>
        );
    }
});

React.render(
<CommentBox url="/comment" pollInterval={2000}/>,
    document.getElementById('person-list')
);