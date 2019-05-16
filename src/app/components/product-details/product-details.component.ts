import { Component, OnInit } from '@angular/core';
import { ConnectBackendService } from 'src/app/services/connect-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private http: ConnectBackendService, private router: Router) { }


  /*
   * ===========================================================
   * ======= Get Comments Section ==============================
   * ===========================================================
   */

  // to fire a function when this component get initialized
  ngOnInit() {
    this.http.getComments(Number(this.segments[2].path)).subscribe(
      result => {result.forEach((value)=> {this.Comments.push(value)})},
      err => { console.log(err) }
    )
  }



  // the data of the product like img_url , material, category and so on
  // the `queryParams` is an object graps all queries in the URI
  Product = this.router.parseUrl(this.router.url).queryParams



  // the data of the url of the current DOM
  tree: UrlTree = this.router.parseUrl(this.router.url);
  group: UrlSegmentGroup = this.tree.root.children[PRIMARY_OUTLET]
  segments: UrlSegment[] = this.group.segments


  // this variable has an instance of the authenticated user
  User = {
    firstname: localStorage.firstname,
    lastname: localStorage.lastname,
    id: localStorage.id
  }


  trackByComments(index, comment){
    return comment? comment : undefined
  }


  /*
  * ===========================================================
  * ======= Add Comment Section ===============================
  * ===========================================================
  */


  // the main object to get the data of the form of the comments
  form = new FormGroup({
    comment: new FormControl('لا إله إلا الله', Validators.required),
  })


  // to make accessing to the comment input field available
  get comment() {
    return this.form.get('comment');
  }



  // the meassage that will appear when the user 
  // hover the submit button of the comment
  tooltip() {
    if (this.User.firstname == undefined) {
      return 'من فضلك قم بتسجيل الدخول أولا';
    }
    else if (this.User.firstname != undefined && this.comment.status == 'VALID') {
      return 'تأكيد'
    } else {
      return 'قم بكتابة شئ اولاًً'
    }
  }


  // the comments on that product
  Comments = [];

  addComment() {
    this.http.addComment(this.comment.value, this.User.id, this.segments[2].path).subscribe(
      result => {

        // if every thing is ok
        // init this to ''
        this.comment.setValue('')

        // this.Comments = result
        console.log(this.Comments)
      },
      err => { console.log(err) })
  }
}