function addChild1() {
    console.log('-----', n1.isExpanded());
    if (n1.isExpanded()) {
	for (var i=0;i<n1.getChildCount(); i++){
	    n1.removeChildPos(i);
	}
	var n11 = new TreeNode("1.1");
	n1.addChild(n11);
    }
    console.log(n1.getChildCount());
}

var root = new TreeNode("root");
var n1 = new TreeNode("1");
n1.on("click",  addChild1);
root.addChild(n1);

var view = new TreeView(root, "#container");

function toggleCustomIcon(n){
    if(n == true){
	root.changeOption("icon", '<i class="fas fa-code-branch"></i>');
    }else{
	root.changeOption("icon", undefined);
    }
    view.reload();
}    

view.changeOption("leaf_icon", '<i class="fas fa-file"></i>');
view.changeOption("parent_icon", '<i class="fas fa-folder"></i>');
TreeConfig.open_icon = '<i class="fas fa-angle-down"></i>';
TreeConfig.close_icon = '<i class="fas fa-angle-right"></i>';

toggleCustomIcon(TreeUtil.getProperty(root.getOptions(), 'icon', true));    

