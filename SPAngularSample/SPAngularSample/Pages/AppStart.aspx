<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">

    <!-- styling -->
    <%--<link href="../Style%20Library/Content/normalize.css" rel="stylesheet" />--%>
    <link href="../Style%20Library/Content/app.css" rel="stylesheet" />

    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script src="/_layouts/15/MicrosoftAjax.js"></script>
    <script src="/_layouts/15/init.js"></script>
    <script src="/_layouts/15/core.js"></script>
    <script src="/_layouts/15/sp.js"></script>
    <script src="/_layouts/15/sp.init.js"></script>
    <script src="/_layouts/15/sp.core.js"></script>
    <script src="/_layouts/15/1033/strings.js"></script>
    <script src="/_layouts/15/SP.UI.Controls.js"></script>
    <script src="/_layouts/15/SP.WorkflowServices.js"></script>
    <script src="/_layouts/15/clienttemplates.js"></script>
    <script src="/_layouts/15/clientforms.js"></script>
    <script src="/_layouts/15/clientpeoplepicker.js"></script>
    <script src="/_layouts/15/autofill.js"></script>

    <meta name="WebPartPageExpansion" content="full" />

    <script src="../Style%20Library/Scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="../Style%20Library/Scripts/angular.js" type="text/javascript"></script>

    <script src="../Style%20Library/Scripts/angular.js"></script>
    <script src="../Style%20Library/Scripts/angular-cookies.js"></script>
    <script src="../Style%20Library/Scripts/angular-route.js"></script>
    <script src="../Style%20Library/Scripts/angular-resource.js"></script>
    <script src="../Style%20Library/Scripts/angular-sanitize.js"></script>
    <script src="../Style%20Library/Scripts/angular-animate.js"></script>
    <script src="../Style%20Library/Scripts/moment.js"></script>
    <script src="../Style%20Library/Scripts/moment-with-langs.js"></script>

    <!-- my libraries -->
    <script src="../Style%20Library/App/util/jquery-extensions.js"></script>

    <!-- app bootstrapping (used to get the app going) -->
    <script src="../Style%20Library/App/app.js"></script>
    <script src="../Style%20Library/App/config.js"></script>
    <script src="../Style%20Library/App/config.angular.http.js"></script>
    <script src="../Style%20Library/App/config.exceptionHandler.js"></script>
    <script src="../Style%20Library/App/config.route.js"></script>

    <!-- common modules -->
    <script src="../Style%20Library/App/common/common.js"></script>
    <script src="../Style%20Library/App/common/logger.js"></script>

    <!-- app core -->
    <script src="../Style%20Library/App/layout/spAppChrome.js"></script>
    <script src="../Style%20Library/App/layout/header.js"></script>
    <script src="../Style%20Library/App/layout/quicklaunch.js"></script>
    <script src="../Style%20Library/App/layout/shell.js"></script>

    <!-- app models -->
    <script src="../Style%20Library/App/models/testDataModel.js"></script>

    <!-- app controllers -->
    <script src="../Style%20Library/App/controllers/dashboard.js"></script>
    <script src="../Style%20Library/App/controllers/testData.js"></script>
    <script src="../Style%20Library/App/controllers/course.js"></script>
    <script src="../Style%20Library/App/controllers/student.js"></script>

    <!-- app services -->
    <script src="../Style%20Library/App/services/spContext.js"></script>
    <script src="../Style%20Library/App/services/provinceService.js"></script>
    <script src="../Style%20Library/App/services/testDataService.js"></script>
    <script src="../Style%20Library/App/services/courseService.js"></script>
    <script src="../Style%20Library/App/services/courseTopicService.js"></script>
    <script src="../Style%20Library/App/services/studentService.js"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    
    <div data-ng-app="app">
        
        
        
        
                    <div data-ng-controller="header as vm">

                                    <h1>
                                        <span>
                                            <a href="{{vm.appHomeUrl}}" data-ng-bind-html="vm.appTitle"></a>
                                        </span>
                                        <span data-ng-show="vm.currentPageTitle">
                                            <span>
                                                <span style="height: 16px; width: 16px; position: relative; display: inline-block; overflow: hidden;">
                                                    <img src="/_layouts/15/images/spcommon.png?rev=23" alt=":" style="position: absolute; left: -109px !important; top: -232px !important;">
                                                </span>
                                            </span>
                                        </span>
                                        <span>
                                            <span id="ms-pageTitleCurrentNode">{{vm.currentPageTitle}}</span>
                                        </span>
                                    </h1>
                            
                    </div>


                        <div data-ng-controller="quicklaunch as vm">



                            <h2 class="spaced">Choose a function below</h2>
                                        <ul class="tiled">
                                            <li data-ng-repeat="route in vm.navRoutes" data-ng-class="{selected: vm.isCurrent(route)}">
                                                <a href="#{{route.url}}"
                                                    data-ng-bind-html="route.config.settings.content"
                                                
                                                    data-ng-class="{selected:vm.isCurrent(route), 'selected':vm.isCurrent(route)}"></a>
                                            </li>
                                        </ul>                                    
                                
                        </div>

                            <div data-ng-controller="shell as vm" class="spaced">
                                <section id="content" class="view-container">
                                    <div data-ng-view class="shuffle-animation"></div>
                                </section>
                            </div>
                        
                    
        

    </div>
</asp:Content>
