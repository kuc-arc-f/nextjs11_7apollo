import moment from 'moment'
//
const LibNote = {
  get_tags: function(){
    try{
      return [
        "tag_1",
        "tag_2",
        "tag_3",
        "tag_4",
      ];
    } catch (e) {
      console.log(e);
      throw new Error('error, get_tags');
    }
  },
  getCategory: function(){
    return [
      "category_1",
      "category_2",
      "category_3",
      "category_4",
    ];

  },

}
export default LibNote
