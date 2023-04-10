function listChildren(node, level) {
    var j;
    for (j=0;j<node.getChildCount();j++) {
    	var code;
        ref = node.getChildAt(j).getHistoryReference();
        if(ref.getStatusCode() == 404){
        	ref.getSiteNode().removeFromParent();
	} else {
        	listChildren(node.getChildAt(j), level+1);
	}
    }
}

siteTree = model.getSession().getSiteTree()
root = siteTree.getRoot();
listChildren(root, 0);
siteTree.reload();

// http://www.hahwul.com/2023/04/11/clearing-404-from-zap-site-tree/
