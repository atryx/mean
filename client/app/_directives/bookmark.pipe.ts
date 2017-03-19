import { Pipe, PipeTransform } from '@angular/core';

import { Bookmark } from '../_models/bookmark';

@Pipe({ name: 'bookmarkFilter' })
export class BookmarkFilterPipe implements PipeTransform {
  transform(bookmarks: Bookmark[], args: string) {
    if(args === undefined) return bookmarks;
    return bookmarks.filter(bookmark => bookmark.name.indexOf(args) !== -1);
  }
}