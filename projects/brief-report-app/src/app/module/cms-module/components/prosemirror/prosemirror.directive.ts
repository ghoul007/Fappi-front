import {ElementRef, Injector, OnInit, ViewContainerRef} from '@angular/core';
import {EditorState, Plugin} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {exampleSetup} from 'prosemirror-example-setup';
import {schema} from 'prosemirror-schema-basic';
import {DOMParser, DOMSerializer, Schema} from 'prosemirror-model';
import {setBlockType, toggleMark} from 'prosemirror-commands';
import {baseKeymap, keymap} from 'prosemirror-keymap';
import {MenuView} from './MenuView';


function menuPlugin(items) {
  return new Plugin({
    view(editorView) {
      const menuView = new MenuView(items, editorView);
      editorView.dom.parentNode.insertBefore(menuView.dom, editorView.dom);
      return menuView;
    }
  });
}

// Helper function to create menu icons
function icon(text, name) {
  const span = document.createElement('span');
  span.className = 'menuicon ' + name;
  span.title = name;
  span.textContent = text;
  return span;
}

/*@Directive({
    selector: '[appProseMirror]'
})*/
export class ProseMirrorDirective implements OnInit {

  // @ViewChild("content", { read: ElementRef }) contentElement: ElementRef;
  // @ViewChild("editor", { read: ElementRef }) editor: ElementRef;

  // @Input() content: string;
//  @Output() contentChange = new EventEmitter();
  view: EditorView;

  constructor(private el: ElementRef, public viewContainerRef: ViewContainerRef, private injector: Injector) {
  }

  ngOnInit() {


// ref is the target
    /* const mySchema = new Schema({
       nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
       marks: schema.spec.marks
     });*/
    const mySchema = new Schema({
      nodes: {
        text: {
          group: 'inline'
        },
        doc: {content: 'text*'}
      }
    });

    const menu = menuPlugin([
      {command: toggleMark(schema.marks.strong), dom: icon('B', 'strong')},
      {command: toggleMark(schema.marks.em), dom: icon('i', 'em')},
      {command: setBlockType(schema.nodes.paragraph), dom: icon('p', 'paragraph')},
    ]);
    const plugins = exampleSetup({schema: mySchema});
    plugins.push(menu);
    this.view = new EditorView(this.viewContainerRef.element.nativeElement, {
      // this.viewContainerRef.element.nativeElement.value
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse('mariaeinf'),
        plugins: [keymap(baseKeymap), menu]
      }),

      dispatchTransaction: transaction => {
        const newState = this.view.state.apply(transaction);
        this.view.updateState(newState);
        // const contentNode = Node.fromJSON(schema, this.view.state.doc);
        const aaa = DOMSerializer
          .fromSchema(schema).serializeFragment(this.view.state.doc.content);
        //  .serializeFragment(contentNode.content, {
        //   "document": doc
        // }, target)

        const div = document.createElement('div');
        const fragment = DOMSerializer
          .fromSchema(mySchema)
          .serializeFragment(this.view.state.doc.content);
        div.appendChild(fragment);

        console.log((this.viewContainerRef.element.nativeElement as HTMLDivElement).getElementsByTagName('div')[1].innerHTML);

        // console.log(doc.getElementById("content").innerHTML)
        // this.content = this.view.state.doc;
        // this.contentChange.emit(this.content);

      }
    });
  }

}

