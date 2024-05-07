import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService,
    ) { }

  loadComments(postId: string) {
    return this.afs.collection('comments', ref => ref.where('postId', '==', postId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, data };
        });
      })
    );
  }

  addComments(comData: any) {
    this.afs.collection('comments').add(comData).then(() => {
      this.toastr.success('Comment added successfully');
    })
  }

  
}
