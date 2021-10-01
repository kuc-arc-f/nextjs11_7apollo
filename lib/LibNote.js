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

}
export default LibNote
